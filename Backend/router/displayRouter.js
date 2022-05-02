const express = require("express")
const router = new express.Router()

//controller
const DisplayController = require("../controller/DisplayController")

//fecth Details
router.get("/myhelpers/fetchAllData/:role", DisplayController.fetchAllData)
//save Route
router.post("/myhelpers/saveUser/:rid",DisplayController.saveUserData)




module.exports = router