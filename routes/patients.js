const express = require("express")
const {
    createPatient,
    getAllPatients,
    getPatientById,
    updatePatient,
    deletePatient,
} = require("../controllers/patient")

const authMiddleware = require('../middlewares/authentication')

const router = express.Router()

router.route("/add-patient").post(authMiddleware, createPatient)

router.route("/").get(authMiddleware, (req,res,next)=>{
    req.title = ''
    next()
} , getAllPatients)


router.route("/:id").put(authMiddleware, updatePatient).delete(authMiddleware, deletePatient)


router.route("/details/:id").get(authMiddleware, getPatientById)

module.exports = router
