const sql = require("../config/db.js")


const getAssignmentByID = async (req,res)=>{
    try {
        const {id} = req.params

        const assessment = await sql`SELECT * FROM assessments WHERE id = ${id}`

        res.render('assessment_details', {assessment: assessment[0]})

    } catch (error) {
        res.status(500, json({error: error}))
    }
}


const updateAssessment = async (req,res)=>{
    try {
        const {id} = req.params
        const { score, responses, severity, self_harm_risk, recommendation } = req.body;

        await sql`
            UPDATE assessments 
            SET 
                score = ${score}, 
                responses = ${responses}, 
                severity = ${severity}, 
                self_harm_risk = ${self_harm_risk}, 
                recommendation = ${recommendation}
            WHERE id = ${id}
        `;

        res.status(200).json({ message: "Assessment updated successfully" });

    } catch (error) {
        res.status(500, json({error: error}))
    }
}


module.exports = {
    getAssignmentByID
}