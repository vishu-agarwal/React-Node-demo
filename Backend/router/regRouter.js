const express = require("express")
const router = new express.Router()
//let count = 100
//model File
const regModel = require("../model/tblReg")
const optModel = require("../model/tempOtpModel")

const Vonage = require('@vonage/server-sdk')
const vonage = new Vonage({
    apiKey: process.env.VONAGE_SMS_KEY,
    apiSecret: process.env.VONAGE_API_SECRET
})


//home
router.get("/myhelpers", async (req, res) => {
    console.log("home");
    return res.json({ data: "Welcome user at my helpers" })
})

//generate otp

router.post("/myhelpers/login/otp/:role", async (req, res) => {
    try {
        const rid = req.params.role.charAt(0)
        const mbl = req.body.mob_num
        const found = await regModel.find({ mob_num: mbl })
        if (found.length !== 0) {
            const fnd_role = found.r_id.charAt(0)
            if (rid === fnd_role) {
                // return res.status(200).send(found)
                const from = "MyHelpersSMSAPI"
                const to = mbl
                const otp = Math.floor(100000 + Math.random() * 900000)
                const text = 'MyHelpers Login OTP is :: ' + otp + '   '

                vonage.message.sendSms(from, to, text, (err, responseData) => {
                    if (err) {
                        console.log(err);
                        throw new Error(err)
                    } else {
                        if (responseData.messages[0]['status'] === "0") {
                            console.log("Message sent successfully.");
                            const user = {
                                mob_num: mbl,
                                opt
                            }
                            // console.log("final user :: ",user);
                            const newUser = new optModel(user)
                            await newUser.save()
                            // return res.status(200).send(newUser);
                            return res.status(200).send({ message: "OTP Message sent successfully." })
                        } else {
                            console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
                            throw new Error(`Message failed with error: ${responseData.messages[0]['error-text']}`)
                        }
                    }
                })
            }
            else {
                //return res.status(400).send()
                throw new Error("you are unauthorized for this role")
            }
        }
        else {

            const from = "MyHelpersSMSAPI"
            const to = req.body.mob_num
            const otp = Math.floor(100000 + Math.random() * 900000)
            const text = 'MyHelpers Login OTP is :: ' + otp + '   '

            vonage.message.sendSms(from, to, text, (err, responseData) => {
                if (err) {
                    console.log(err);
                    throw new Error(err)
                } else {
                    if (responseData.messages[0]['status'] === "0") {
                        console.log("Message sent successfully.");
                        const user = {
                            mob_num: mbl,
                            opt
                        }
                        const newUser = new optModel(user)

                        // console.log(newUser);
                        await newUser.save()
                        // return res.status(200).send(newUser);
                        return res.status(200).send({ message: "OTP Message sent successfully." })
                    } else {
                        console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
                        throw new Error(`Message failed with error: ${responseData.messages[0]['error-text']}`)
                    }
                }
            })
        }
    }
    catch (error) {
        res.status(400).send(error.message)
    }
})

//register user
router.post("/myhelpers/register/:role", async (req, res) => {
    console.log(req.params.role)
    const role = req.params.role.charAt(0)
    // console.log(role)
    try {
        const found = await regModel.find({ mob_num: req.body.mob_num });
        // console.log(found)
        if (found.length !== 0) {
            // const fnd_role = found.r_id.charAt(0)
            // if (role === fnd_role) {
            //     // return res.status(200).send(found)

            const token = await found.generateAuthToken()
            return res.status(200).send({ found, token })
            // }
            // else {
            //     //return res.status(400).send()
            //     throw new Error("you are unauthorized for this role")
            // }

            //const updatepro = await ProductModel.findOneAndUpdate({ password: req.body.password }, updt, { new: true })
        }
        else {

            const id = await regModel.findOne().sort({ createdAt: -1 })
            // console.log("id ::",id)
            let rid
            if (id) {
                rid = id.r_id.slice(1)
                console.log("rid from id", rid);
            }
            else {
                rid = 100
                // console.log("rid inital ::",rid);
            }
            // console.log(role)
            // const assignrole = await regModel.assignRole(req.params.role)
            const r_id = role + ++rid
            // console.log(r_id);
            const user = { r_id, ...req.body }
            // console.log("final user :: ",user);
            const newUser = new regModel(user)

            // console.log(newUser);
            await newUser.save()
            // return res.status(200).send(newUser);
            const token = await newUSer.generateAuthToken()
            return res.status(200).send({ newUser, token })
        }
    } catch (error) {
        // console.log(error.message)
        res.status(400).send(error.message)
    }

})
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