const express = require("express")
const router = new express.Router()

//controller
const HireRequestController= require("../controller/HireRequestController")
// hire user
router.post("/myhelpers/sendHelperRequest/:rid", HireRequestController.createHireRequest)
// requestfor work
router.get("/myhelpers/fetchHireRequest/:rid", HireRequestController.fetchHireRequest)
//fetch single user
router.get("/myhelpers/fetchSingleHireRequest/:rid/:hid", HireRequestController.fetchSingleHireRequest)
//update request
router.put("/myhelpers/updateHireRequest/:rid",HireRequestController.updateHireRequest)
module.exports = router