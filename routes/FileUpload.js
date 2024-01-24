const express = require('express')
const router = express.Router()

// import controllers
const { localFileUpload ,imageUpload ,videoUpload} = require("../controllers/fileUpload")

// api mapping
router.post("/localFileUpload",localFileUpload)
router.post("/imageUpload",imageUpload)
router.post("/videoUpload",videoUpload)

module.exports = router