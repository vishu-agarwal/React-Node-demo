const express = require("express")
const router = new express.Router()

//mideleware authorization file
const auth = require("../middleware/authMidleware")

//controller
const DisplayController = require("../controller/DisplayController")

//fecth Details
router.get("/myhelpers/fetchAllData/:role",auth, DisplayController.fetchAllData)
//save Route
router.post("/myhelpers/saveUser/:rid",auth,DisplayController.saveUserData)
//fetch saveData
router.get("/myhelpers/fetchSaveUser/:rid",auth,DisplayController.fetchSaveUser)
//search router
router.get("/myhelpers/search",auth, DisplayController.searching)
//sort
router.get("/myhelpers/sort", auth, DisplayController.sorting)

module.exports = router