const express = require("express")
const authMiddleware = require('../middlewares/authentication')
const {fillHopi, updateHopi, showReport} = require('../controllers/information')
const sql = require('../config/db')


const router = express.Router()

router.route("/:id/hopi").get(async (req, res) => {
    const { id } = req.params;
    try {
        const hopiData = await sql`SELECT hopi FROM information WHERE patient_id = ${id}`;
        const hopi = hopiData.length > 0 ? hopiData[0].hopi : null;

        res.render('hopi', { patient_id: id, hopi });

    } catch (error) {
        console.error('Error fetching HOPI data:', error);
        res.status(500).json({ error: 'Error fetching HOPI data' });
    }
})
    .post(authMiddleware, fillHopi)
    .put(authMiddleware, updateHopi)

router.route("/:id/report").get(authMiddleware, showReport)

module.exports = router
