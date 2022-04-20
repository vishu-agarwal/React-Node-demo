const express = require("express")
const router = new express.Router()
//let count = 100
//model File
const regModel = require("../model/tblReg")
//controllers
const otpController = require("../controller/otpController")
const regController = require("../controller/regController")

//home
router.get("/myhelpers", async (req, res) => {
    console.log("home");
    return res.json({ data: "Welcome user at my helpers" })
})

//generate otp

router.post("/myhelpers/otp/:role", otpController.otpLoginController)

//register user
router.post("/myhelpers/register/:role", regController.loginController)
//fetch users
router.get("/myhelpers/fetchuser", async (req, res) => {
    const list = await regModel.find()
    console.log(list);
    res.send(list)
})

// login user information
router.get("/myhelpers/profile", async (req, res) => {

    const list = await req.user
    //console.log(list);
    res.send(list)
})

//Login user
// router.post("/myhelpers/login", async (req, res) => {

//     try {
//         // const user = await regModel.findByCredentials(req.body.uname, req.body.password)
//         //   console.log("user :::: "+user);
//         //token
//         const isToken = await regModel.findOne({ tokens: user.tokens[0] })
//         // console.log("login token ::: "+isToken);
//         if (isToken) {
//             return res.status(200).send("you already logged in !!")
//         }
//         const token = await user.generateAuthToken()//user created method
//         return res.status(200).send({ user, token })
//     } catch (e) {
//         res.status(400).send(e.message)
//     }
// })

//logout

router.delete("/user/logout", async (req, res) => {
    console.log("logout call :: ");
    try {
        // req.user.tokens = req.user.tokens.filter((token) => {
        //     return token.token !== req.tok
        // })

        const isToken = await regModel.findOneAndUpdate({ _id: req.user._id }, { tokens: [] }, { new: true })
        // this is use to delete all tokens
        //if not write current token is only deleted
        //   req.user.tokens = []
        //await req.user.save()
        res.status(200).send("success fully logout!!")
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router