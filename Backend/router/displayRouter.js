const express = require("express")
const router = new express.Router()

//controller
const DisplayController = require("../controller/DisplayController")

//fecth Details
router.get("/myhelpers/fetchAllData/:role", DisplayController.fetchAllData)





module.exports = router