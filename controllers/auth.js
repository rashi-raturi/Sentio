const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const sql = require("../config/db.js")

const signup = async (req, res) => {
    const { full_name, email, password } = req.body

    try {
        const existingUser = await sql`SELECT id FROM psychologists WHERE email = ${email}`
        if (existingUser.length > 0) {
            return res.status(400).json({ message: "Email already in use! Please log in." })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await sql`
            INSERT INTO psychologists (full_name, email, password)
            VALUES (${full_name}, ${email}, ${hashedPassword})
            RETURNING id, full_name, email
        `

        const user = newUser[0]
        const token = jwt.sign({ id: user.id, name: user.full_name, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" })

        res.redirect('/patients')
        return res.status(200).json({ message: "Signup successful", user, token })

    } catch (error) {
        console.error("Signup Error:", error)
        return res.status(500).json({ message: "Signup failed", error: error.message })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body

    try {
        const userResult = await sql`
            SELECT id, full_name, email, password FROM psychologists WHERE email = ${email}
        `

        if (userResult.length === 0) {
            return res.status(404).json({ message: "User not found" })
        }

        const user = userResult[0]

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" })
        }

        const token = jwt.sign({ id: user.id, name:user.full_name, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" })
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        
        res.redirect('/patients')


    } catch (error) {
        console.error("Login Error:", error)
        return res.status(500).json({ message: "Login failed", error: error.message })
    }
}

module.exports = {
    login,
    signup
}
