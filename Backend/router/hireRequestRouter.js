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
router.put("/myhelpers/updateHireRequest/:rid", HireRequestController.updateHireRequest)
//accept request
router.patch("/myhelpers/acceptRequest/:rid/:cid", HireRequestController.acceptClientRequest)
//reject request
router.patch("/myhelpers/rejectRequest/:rid/:cid", HireRequestController.rejectClientRequest)
//delete request by client
router.patch("/myhelpers/deleteRequest/:rid/:hid", HireRequestController.deleteHelperRequest)    
module.exports = router