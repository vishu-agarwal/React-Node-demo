const regModel = require("../model/tblReg")
const userModel = require("../model/UserModel")

// const loginController = async (req, res) => {
//     // console.log(req.params.role)
//     const role = req.params.role.charAt(0)
//     let newUser 
//     console.log(req.body.email)
//     try {
//         const found = await regModel.find({ email: req.body.email });
//          console.log("loginfound::",found)
//         if (found.length !== 0) {
//             const fnd_role = found[0].r_id.charAt(0)
//             if (role === fnd_role) {
//                 newUser = new regModel(...found)
//                 // console.log(newUser)
//                 // const token = await found.generateAuthToken()
//                 // return res.status(200).send({ found, token })
//             }
//             else {
//                 //return res.status(400).send()
//                 throw new Error("You are unauthorized for this role")
//             }
//         }
//         else {

//             const id = await regModel.findOne().sort({ createdAt: -1 })
//             // console.log("id ::",id)
//             let rid
//             if (id) {
//                 rid = id.r_id.slice(1)
//                 // console.log("rid from id", rid);
//             }
//             else {
//                 rid = 100
//                 // console.log("rid inital ::",rid);
//             }
//             // console.log(role)
//             // const assignrole = await regModel.assignRole(req.params.role)
//             const r_id = role + ++rid
//             // console.log(r_id);
//             const user = { r_id, ...req.body }
//             // console.log("final user :: ",user);
//             newUser = new regModel(user)
//             // console.log(newUser);
//             await newUser.save()
//             // return res.status(200).send(newUser);

//         }
//         const token = await newUser.generateAuthToken()
//         return res.status(200).send({ newUser, token })
//     }
//     catch (error) {
//         // console.log(error.message)
//         res.status(400).send(error.message)
//     }
// }


// const fast2sms = require('fast-two-sms')
const nodemailer = require("nodemailer");


async function otpFunction(email) {
    // return new Promise(async (resolve, reject) => {
    console.log("mailid ", email)
    const receiverMail = email
    const otp = Math.floor(100000 + Math.random() * 900000)
    const mailText = 'MyHelpers Login OTP is :: ' + otp + ' . \nIt is expired after One minute!'
    console.log(mailText, "text", receiverMail, "mail")
    try {
       
        let testAccount = await nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            // host: "smtp.gmail.email",
            // port: 587,
            // secure: false, // true for 465, false for other ports
            service: "gmail",
            auth: {
                user: "realadtest@gmail.com", // generated ethereal user
                pass: "smartdevs@123", // generated ethereal password
            },
        });
       
        let info = await transporter.sendMail({
            from: 'realadtest@gmail.com', // sender address
            to: receiverMail, // list of receivers
            subject: "Otp SMS My Helpers ✔", // Subject line
            text: mailText, // plain text body
            // html: "<b>Hello world?</b>", // html body
        });

      
        if (info) {
            return otp
        }
        else {
            throw new Error("Some problem while sending OTP !")
        }
        // return otp
    } catch (error) {
        // console(error);
        return error.message;
    }
}
const otpLoginController = async (req, res) => {
    try {
        console.log("otp login controller ")
        console.log(req.body,"  bodu otp::: ")
        const role = req.params.role.charAt(0)
        const email = req.body.email
        const found = await userModel.find({ email: email })
        console.log("found otp controller ::", found)
        if (found.length) {
            const fnd_role = found[0].r_id.charAt(0)
            if (role !== fnd_role) {

                throw new Error("You are unauthorized for this role!")
            }
            else {
                const otp = await otpFunction(email)
                const updateOtp = await userModel.findOneAndUpdate({ email: email },
                    {
                        otp: otp
                    },
                    { new: true }
                )
                return res.status(200).send({ message: "OTP Message sent successfully.", otp })
            }
        }
        const otp = await otpFunction(email)
        console.log("otp", otp)
        const userLogin =
        {
            email: email,
            otp
        }
        const id = await userModel.findOne().sort({ createdAt: -1 })
        console.log("id ::",id)
        let rid
        if (id) {
            rid = id.r_id.slice(1)
            console.log("rid from id", rid);
        }
        else {
            rid = 100
            console.log("rid inital ::",rid);
        }

        const r_id = role + ++rid
        console.log(r_id);
        const user = { r_id, ...userLogin }
        console.log("final user :: ",user);
        newUser = new userModel(user)
        // console.log(newUser);
        await newUser.save()
        // return res.status(200).send(newUser);
        return res.status(200).send({ message: "OTP Message sent successfully.", otp })

    }
    catch (error) {
        res.status(400).send(error.message)
    }
}
const loginController = async (req, res) => {
    // console.log(req.params.role)
    try {
    // const role = req.params.role.charAt(0)
    // let newUser
    console.log(req.body.email)
   
        const found = await userModel.findOne({ email: req.body.email });
        console.log("loginfound::", found)
        const user = new userModel(found)
        const token = await user.generateAuthToken()
        const removeOtp = await userModel.findOneAndUpdate({email:found.email},{otp:''},{new:true})
        return res.status(200).send({ removeOtp, token })
    }
    catch (error) {
        // console.log(error.message)
        return res.status(400).send(error.message)
    }
}

module.exports = {
    loginController,
    otpLoginController
}