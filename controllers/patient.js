const sql = require("../config/db.js")

const createPatient = async (req, res) => {
    let { psychologist_id, full_name, date_of_birth, gender, contact_info, diagnosis } = req.body
    if(!diagnosis) diagnosis = "undiagnosed"

    try {
        const psychResult = await sql`SELECT id FROM psychologists WHERE id = ${psychologist_id}`
        if (psychResult.length === 0) {
            return res.status(404).json({ message: "Psychologist not found" })
        }

        const newPatient = await sql`
            INSERT INTO patients (psychologist_id, full_name, date_of_birth, gender, contact_info, diagnosis)
            VALUES (${psychologist_id}, ${full_name}, ${date_of_birth}, ${gender}, ${contact_info}, ${diagnosis})
            RETURNING *
        `

        res.status(201).json({ message: "Patient created successfully", patient: newPatient[0] })

    } catch (error) {
        console.error("Error creating patient:", error)
        res.status(500).json({ message: "Error creating patient", error: error.message })
    }
}

const getAllPatients = async (req, res) => {
    const psychologist_id = req.user.id

    try {
        const result = await sql`SELECT * FROM patients WHERE psychologist_id = ${psychologist_id}`

        res.render('home', { patients: result, user:req.user})

    } catch (error) {
        console.error("Error retrieving patients:", error)
        res.status(500).json({ message: "Error retrieving patients", error: error.message })
    }
}

const getPatientById = async (req, res) => {
    const { id } = req.params

    try {
        const patientResult = await sql`SELECT * FROM patients WHERE id = ${id}`
        const assessmentResult = await sql`SELECT * FROM assessments WHERE patient_id = ${id}`
        const avgAssessmentScore = await sql`
            SELECT assessment_name, AVG(score) as avg_score
            FROM assessments
            WHERE patient_id = ${id}
            GROUP BY assessment_name
        `;

        if (patientResult.length === 0) {
            return res.status(404).json({ message: "Patient not found" })
        }

        res.render('patient', { patient: patientResult[0], title: '', assessments: assessmentResult, avgScore: avgAssessmentScore })

    } catch (error) {
        console.error("Error retrieving patient:", error)
        res.status(500).json({ message: "Error retrieving patient", error: error.message })
    }
}

const updatePatient = async (req, res) => {
    const { id } = req.params
    const { full_name, date_of_birth, gender, contact_info, diagnosis } = req.body

    try {
        const updatedPatient = await sql`
            UPDATE patients
            SET full_name = ${full_name}, date_of_birth = ${date_of_birth}, gender = ${gender}, contact_info = ${contact_info}, diagnosis = ${diagnosis}
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
    getAllPatients,
    getPatientById,
    updatePatient,
    deletePatient
}
