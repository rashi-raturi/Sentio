const sql = require('../config/db')

const fillHopi = async(req,res)=>{
    const patient_id = req.params.id
    try {
        const hopiData = req.body
        const psychologistID = await sql`Select psychologist_id from patients where id = ${patient_id}`

        await sql`
        INSERT INTO information(hopi,patient_id,psychologist_id) VALUES(${hopiData}, ${patient_id}, ${psychologistID[0].psychologist_id})
        `

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

        console.log('HOPI Form updated')
        return res.status(200).json({ message: 'HOPI data updated successfully' })
    } catch (error) {
        console.warn('Error updating HOPI')
        console.log(error)
        
        return res.status(500).json({ error: error })
    }
}


module.exports = {
    fillHopi,
    updateHopi
}