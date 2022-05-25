const express = require("express")
const router = new express.Router()

//mideleware authorization file
const auth = require("../middleware/authMidleware")

//controller
const HireRequestController = require("../controller/HireRequestController")

// hire user
router.post("/myhelpers/sendHelperRequest/:rid",auth, HireRequestController.createHireRequest)
// requestfor work
router.get("/myhelpers/fetchHireRequest/:rid",auth, HireRequestController.fetchHireRequest)
//fetch single user
router.get("/myhelpers/fetchSingleHireRequest/:rid/:hid",auth, HireRequestController.fetchSingleHireRequest)
//update request
router.put("/myhelpers/updateHireRequest/:rid",auth, HireRequestController.updateHireRequest)
//accept request
router.patch("/myhelpers/acceptRequest/:rid/:cid",auth, HireRequestController.acceptClientRequest)
//reject request
router.patch("/myhelpers/rejectRequest/:rid/:cid",auth, HireRequestController.rejectClientRequest)
//delete request by client
router.patch("/myhelpers/deleteRequest/:rid/:hid", auth, HireRequestController.deleteHelperRequest)  
  
module.exports = router