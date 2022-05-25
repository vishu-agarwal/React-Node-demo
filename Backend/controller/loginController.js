
const userModel = require("../model/UserModel")

const nodemailer = require("nodemailer");

//call from otp generate function 
async function otpFunction(email) {
    const receiverMail = email
    const otp = Math.floor(100000 + Math.random() * 900000)
    const mailText = 'MyHelpers Login OTP is :: ' + otp + ' . \nIt is expired after One minute!'
    console.log(mailText, "text", receiverMail, "mail")
    try {
        let testAccount = await nodemailer.createTestAccount();
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
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
        });
      
        if (info) {
            return otp
        }
        else {
            throw new Error("Some problem while sending OTP !")
        }
    } catch (error) {
        return error.message;
    }
}
// generate otp at otp send and resend
const otpLoginController = async (req, res) => {
    try {
        const role = req.params.role.charAt(0)
        const email = req.body.email
        const found = await userModel.find({ email: email })
        if (found.length) {
            const fnd_role = found[0]?.r_id.charAt(0)
            if (role !== fnd_role) {
                throw new Error("You are unauthorized for this role!")
            }
            else {
                const otp = await otpFunction(email)
                const updateOtp = await userModel.findOneAndUpdate({ email: email },
                    {otp: otp},{ new: true }
                )
                return res.status(200).send({ message: "OTP Message sent successfully.", otp })
            }
        }
        //call otp function
        const otp = await otpFunction(email)
        const userLogin =
        {
            email: email,
            otp
        }
        // generate r_id depends on role
        const id = await userModel.findOne().sort({ createdAt: -1 })
        let rid
        if (id) {
            rid = id.r_id.slice(1)
        }
        else {
            rid = 100
        }
        const r_id = role + ++rid
        const user = { r_id, ...userLogin }
        newUser = new userModel(user)
        await newUser.save()
        return res.status(200).send({ message: "OTP Message sent successfully.", otp })
    }
    catch (error) {
        res.status(400).send(error.message)
    }
}
const loginController = async (req, res) => {
    try {   
        const found = await userModel.findOne({ email: req.body.email });
        const user = new userModel(found)
        const token = await user.generateAuthToken()
        const removeOtp = await userModel.findOneAndUpdate({email:found.email},{otp:''},{new:true})
        return res.status(200).send({ removeOtp, token })
    }
    catch (error) {
        return res.status(400).send(error.message)
    }
}

module.exports = {
    loginController,
    otpLoginController
}