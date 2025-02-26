const sql = require('../config/db')
const { generateReport } = require('../services/hopi_summary.js')

const fillHopi = async(req,res)=>{
    const patient_id = req.params.id
    try {
        const hopiData = req.body
        const psychologistID = await sql`Select psychologist_id from patients where id = ${patient_id}`

        const patientAssessmentData = await sql `SELECT assessment_name,score,severity from assessments WHERE id = ${patient_id}`

        console.log({hopi: hopiData, patientData: patientAssessmentData})

        if(hopiData){
            report_html = await generateReport({hopi: hopiData, patientData: patientAssessmentData})

            await sql`
            INSERT INTO information(hopi,patient_id,psychologist_id, report) VALUES(${hopiData}, ${patient_id}, ${psychologistID[0].psychologist_id, report_html})`
        }

        console.log('Hopi Form saved')
        return res.status(200)

    } catch (error) {
        console.warn('Error filling Hopi')
        console.log(error)

        return res.status(500).json({error:error})
    }
}

const updateHopi = async (req, res) => {
    const patient_id = req.params.id
    try {
        const hopiData = req.body

        await sql`
        UPDATE information
        SET hopi = ${hopiData}
        WHERE patient_id = ${patient_id}
        `

        const patientAssessmentData = await sql `SELECT assessment_name,score,severity from assessments WHERE patient_id = ${patient_id}`

        console.log({hopi: hopiData, patientData: patientAssessmentData})
        console.log('HOPI Form updated')

        report_html = await generateReport({hopi: hopiData, patientData: patientAssessmentData});
        await sql`
            UPDATE information
            SET report_html = ${report_html}
            WHERE patient_id = ${patient_id}
        `

        console.log('Report Updated')
        return res.status(200).json({ message: 'HOPI data updated successfully' })
    } catch (error) {
        console.warn('Error updating HOPI')
        console.log(error)

        return res.status(500).json({ error: error })
    }
}

const showReport = async (req, res) => {
    const { id } = req.params;

    try {
        const reportData = await sql`SELECT report_html FROM information WHERE patient_id = ${id}`;
        const report_html = reportData[0].report_html != null ? reportData[0].report_html : null;
        

        res.render('report', { report_html });

    } catch (error) {
        console.error("Error generating report:", error);
        res.status(500).json({ message: "Error generating report", error: error.message });
    }
}

module.exports = {
    fillHopi,
    updateHopi,
    showReport
}