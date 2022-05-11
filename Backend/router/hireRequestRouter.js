const express = require("express")
const router = new express.Router()

//controller
const HireRequestController= require("../controller/HireRequestController")
// hire user
router.post("/myhelpers/sendHelperRequest/:rid", HireRequestController.createHireRequest)
// requestfor work
router.get("/myhelpers/fetchHireRequest/:rid", HireRequestController.fetchHireRequest)

module.exports = router