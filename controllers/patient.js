const sql = require("../config/db.js")

const createPatient = async (req, res) => {
    const { psychologist_id, full_name, date_of_birth, gender, contact_info } = req.body

    try {
        const psychResult = await sql`SELECT id FROM psychologists WHERE id = ${psychologist_id}`
        if (psychResult.length === 0) {
            return res.status(404).json({ message: "Psychologist not found" })
        }

        const newPatient = await sql`
            INSERT INTO patients (psychologist_id, full_name, date_of_birth, gender, contact_info)
            VALUES (${psychologist_id}, ${full_name}, ${date_of_birth}, ${gender}, ${contact_info})
            RETURNING *
        `

        res.status(201).json({ message: "Patient created successfully", patient: newPatient[0] })

    } catch (error) {
        console.error("Error creating patient:", error)
        res.status(500).json({ message: "Error creating patient", error: error.message })
    }
}

const getPatientsByPsychologist = async (req, res) => {
    const { psychologist_id } = req.params

    try {
        const patients = await sql`SELECT * FROM patients WHERE psychologist_id = ${psychologist_id}`

        res.json({ patients })

    } catch (error) {
        console.error("Error retrieving patients:", error)
        res.status(500).json({ message: "Error retrieving patients", error: error.message })
    }
}

const getPatientById = async (req, res) => {
    const { id } = req.params

    try {
        const patient = await sql`SELECT * FROM patients WHERE id = ${id}`

        if (patient.length === 0) {
            return res.status(404).json({ message: "Patient not found" })
        }

        res.json({ patient: patient[0] })

    } catch (error) {
        console.error("Error retrieving patient:", error)
        res.status(500).json({ message: "Error retrieving patient", error: error.message })
    }
}

const updatePatient = async (req, res) => {
    const { id } = req.params
    const { full_name, date_of_birth, gender, contact_info } = req.body

    try {
        const updatedPatient = await sql`
            UPDATE patients
            SET full_name = ${full_name}, date_of_birth = ${date_of_birth}, gender = ${gender}, contact_info = ${contact_info}
            WHERE id = ${id}
            RETURNING *
        `

        if (updatedPatient.length === 0) {
            return res.status(404).json({ message: "Patient not found" })
        }

        res.json({ message: "Patient updated successfully", patient: updatedPatient[0] })

    } catch (error) {
        console.error("Error updating patient:", error)
        res.status(500).json({ message: "Error updating patient", error: error.message })
    }
}

const deletePatient = async (req, res) => {
    const { id } = req.params

    try {
        const deletedPatient = await sql`DELETE FROM patients WHERE id = ${id} RETURNING *`

        if (deletedPatient.length === 0) {
            return res.status(404).json({ message: "Patient not found" })
        }

        res.json({ message: "Patient deleted successfully" })

    } catch (error) {
        console.error("Error deleting patient:", error)
        res.status(500).json({ message: "Error deleting patient", error: error.message })
    }
}

module.exports = {
    createPatient,
    getPatientsByPsychologist,
    getPatientById,
    updatePatient,
    deletePatient
}
