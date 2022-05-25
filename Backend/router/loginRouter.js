const express = require("express")
const router = new express.Router()

//controllers
const loginController = require("../controller/loginController")

//generate otp
router.post("/myhelpers/otp/:role", loginController.otpLoginController)
//register user
router.post("/myhelpers/register/:role", loginController.loginController)

module.exports = router