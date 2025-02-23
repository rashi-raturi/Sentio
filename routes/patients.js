const express = require("express")
const {
    createPatient,
    getPatientsByPsychologist,
    getPatientById,
    updatePatient,
    deletePatient
} = require("../controllers/patient")

const authMiddleware = require('../services/authentication')

const router = express.Router()

router.route("/").post(authMiddleware, createPatient)

router.route("/:psychologist_id").get(authMiddleware, getPatientsByPsychologist)

router.route("/:id")
    .get(authMiddleware, getPatientById)
    .put(authMiddleware, updatePatient)
    .delete(authMiddleware, deletePatient)

module.exports = router
