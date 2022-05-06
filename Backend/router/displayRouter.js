const express = require("express")
const router = new express.Router()

//controller
const DisplayController = require("../controller/DisplayController")

//fecth Details
router.get("/myhelpers/fetchAllData/:role", DisplayController.fetchAllData)
//save Route
router.post("/myhelpers/saveUser/:rid",DisplayController.saveUserData)
//fetch saveData
router.get("/myhelpers/fetchSaveUser/:rid",DisplayController.fetchSaveUser)
// hire user
router.post("/myhelpers/hireUser/:rid", DisplayController.hireUser)
// requestfor work
router.get("/myhelpers/requestWork/:rid",DisplayController.requestForWork)
//search router
router.get("/myhelpers/search", DisplayController.searching)
module.exports = router