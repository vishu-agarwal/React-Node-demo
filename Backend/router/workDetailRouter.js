const express = require("express")
const router = new express.Router()

//mideleware authorization file
const auth = require("../middleware/authMidleware")

//controllers
const workProfileController = require("../controller/workProfileController")

//create profile 
router.post("/myhelpers/createWorkProfile/:rid",auth, workProfileController.createWorkProfile)
//fecth profile
router.get("/myhelpers/fetchWorkDetail/:rid",auth, workProfileController.fetchWorkDetails)
//update profile
router.put("/myhelpers/updateWorkDetail/:rid",auth, workProfileController.updateWorkDetails)

module.exports = router