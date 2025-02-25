const express = require('express')
const cookieParser = require('cookie-parser')
const path = require('path')
require('dotenv').config()

const auth = require('./routes/auth')
const patients = require('./routes/patients')
const assessments = require('./routes/assessments')
const authCheck = require('./middlewares/authcheck')
const sql = require('./config/db')

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))


app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))


app.use('/auth', auth)
app.use('/patients', patients)
app.use("/assessments", assessments)

app.get('/', authCheck, (req, res) => {
    res.redirect('/patients')
})


const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}...`))
