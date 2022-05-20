const express = require("express")
const router = new express.Router()
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
//check profile avail or not
router.get("/myhelpers/isProfile/:rid", auth, DisplayController.profileAvailable)
module.exports = router