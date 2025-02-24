const express = require("express");
const router = express.Router();
const create_assessment = require('../services/assessment_creation.js');
const sendEmail = require('../services/email.js');
const sql = require("../config/db.js");
const { getAssignmentByID } = require("../controllers/assessments.js");

router.post("/generate-assessment", async (req, res) => {
    const { assessment_name, patient_id, patient_name, patient_email, user_id } = req.body

    try {
        const newAssessment = await sql`
            INSERT INTO assessments (assessment_name, patient_id, psychologist_id)
            VALUES (${assessment_name}, ${patient_id}, ${user_id})
            RETURNING *
        `

        const formLink = `http://localhost:5000/assessments/${newAssessment[0].id}`

        const emailSubject = `Request for Completion of ${assessment_name} Questionnaire`
        const emailText = `Dear ${patient_name},

            I hope this message finds you in good health. As part of our commitment to providing you with the highest standard of care, we kindly request that you complete the attached mental health questionnaire. Your responses are invaluable in helping us to better understand your current condition and tailor our support to your needs.

            Please take a few moments to complete the questionnaire at your earliest convenience. Write ${patient_id} in the ID field.

            ${formLink}

            Thank you for your time and cooperation.

            Sincerely,
            Your Psychologist`

        await sendEmail(patient_email, emailSubject, emailText)

        res.json({ message: "Assessment email sent successfully" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Error sending email", error: error.message })
    }
})

router.get("/:id", async (req, res) => {
    const { id } = req.params

    try {
        const assessment = await sql`SELECT * FROM assessments WHERE id = ${id}`
        if (assessment.length === 0) {
            return res.status(404).json({ message: "Assessment not found" })
        }

        const patientID = assessment[0].patient_id

        const patient = await sql`SELECT full_name, psychologist_id FROM patients WHERE id = ${patientID}`
        if (patient.length === 0) {
            return res.status(404).json({ message: "Patient not found" })
        }

        const psychologistID = patient[0].psychologist_id
        const psychologist = await sql`SELECT email FROM psychologists WHERE id = ${psychologistID}`
        if (psychologist.length === 0) {
            return res.status(404).json({ message: "Psychologist not found" })
        }

        const score = assessment[0].score

        if (score) {
            return res.render("Thanks", { patient_name: patient[0].full_name, user_mail: psychologist[0].email })
        }

        const assessmentForm = await create_assessment(assessment[0].assessment_name)

        res.render("assessment", { title: assessmentForm.assessment_name, description: assessmentForm.description, questions: assessmentForm.questions })
    } catch (error) {
        console.error("Error retrieving assessment: ", error)
        res.status(500).json({ message: "Error retrieving assessment: ", error: error.message })
    }
})

// Handle Form Submission
router.post("/submit", (req, res) => {
    console.log("Form Data:", req.body)
    res.send("Form submitted successfully!")
})


router.get("/details/:id", getAssignmentByID)

module.exports = router