const sql = require("../config/db.js")
const analyzeAssessment = require('../services/assessment_analysis.js')

const getAssignmentByID = async (req,res)=>{
    try {
        const {id} = req.params

        const assessment = await sql`SELECT * FROM assessments WHERE id = ${id}`

        res.render('assessment_details', {assessment: assessment[0]})

    } catch (error) {
        res.status(500, json({error: error}))
    }
}

const updateAssessment = async (req, res) => {
    const {assessment_id, responses } = req.body
    try {
        const patientId = await sql `SELECT * FROM assessments WHERE id = ${assessment_id}`
        const patientInfo = await sql `SELECT * FROM patients WHERE id = ${patientId[0].patient_id}`

        const inputData = {
            full_name: patientInfo[0].full_name,
            gender: patientInfo[0].gender,
            email: patientInfo[0].contact_info.email,
            age: new Date().getFullYear() - new Date(patientInfo[0].date_of_birth).getFullYear(),
            date: new Date().toISOString(),
            responses
        };

        const { analysisResult, htmlResponse } = await analyzeAssessment(inputData);


        const psychologist = await sql`SELECT email FROM psychologists WHERE id = ${patientInfo[0].psychologist_id}`

        const score = analysisResult.score
        const color = analysisResult.color
        const severity = analysisResult.severity
        const self_harm_risk = analysisResult.self_harm_risk
        const summary = analysisResult.summary

        await sql`
            UPDATE assessments
            SET score = ${score},
                responses = ${sql.json(responses)},
                severity = ${severity},
                self_harm_risk = ${self_harm_risk},
                html_code = ${htmlResponse},
                summary = ${summary},
                color = ${color}
            WHERE id = ${assessment_id}
        `
        console.log('Form Submitted Successfully!')
        return res.render("thanks", { patient_name: patientInfo[0].full_name, user_mail: psychologist[0].email})
    } catch (error) {
        console.error("Error submitting form: ", error)
        res.status(500).json({ message: "Error submitting form: ", error: error.message })
    }
}

module.exports = {
    getAssignmentByID,
    updateAssessment
}