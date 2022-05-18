const regModel = require("../model/tblReg")
const optModel = require("../model/tempOtpModel")

// const fast2sms = require('fast-two-sms')
const nodemailer = require("nodemailer");


async function otpFunction(email) {
    // return new Promise(async (resolve, reject) => {
    console.log("mailid ",email)
    const receiverMail = email
    const otp = Math.floor(100000 + Math.random() * 900000)
    const mailText = 'MyHelpers Login OTP is :: ' + otp + ' . \nIt is expired after One minute!'
    console.log(mailText,"text",receiverMail,"mail")
    try {
        // async..await is not allowed in global scope, must use a wrapper
        // async function main() {
            // Generate test SMTP service account from ethereal.email
            // Only needed if you don't have a real mail account for testing
            let testAccount = await nodemailer.createTestAccount();

            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                // host: "smtp.gmail.email",
                // port: 587,
                // secure: false, // true for 465, false for other ports
                service:"gmail",
                auth: {
                    user: "princyvadsak.dcs22n@vnsgu.ac.in", // generated ethereal user
                    pass: "princy@25", // generated ethereal password
                },
            });
        // var mailOptions = {
        //     from: 'princyvadsak.dcs22n@vnsgu.ac.in',
        //     to: receiverMail,
        //     subject: 'Sending Email using Node.js',
        //     text: mailText
        // };

        // transporter.sendMail(mailOptions, function (error, info) {
        //     if (error) {
        //         console.log(error);
        //     } else {
        //         console.log('Email sent: ' + info.response);
        //     }
        // });
            // // send mail with defined transport object
            let info = await transporter.sendMail({
                from: 'princyvadsak.dcs22n@vnsgu.ac.in', // sender address
                to: receiverMail, // list of receivers
                subject: "Otp SMS My Helpers ✔", // Subject line
                text: mailText, // plain text body
                // html: "<b>Hello world?</b>", // html body
            });

            // console.log("Message sent: %s", info.messageId);
            // // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

            // // Preview only available when sending through an Ethereal account
            // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        // }

        // if (response) {
        //     console.log("opt:: ")
        // }
        // else {
        //     throw new Error("Some problem while sending OTP !")
        // }
        // fast2sms.sendMessage({ authorization: process.env.SMS_API_KEY, message: text, numbers: [to] })
        //     .then((res) => {
        //         console.log(res)
        //         return res
        //     }).catch((error) => {
        //         console.log(error)
        //         return ("Some problem while sending OTP!")
        //     }) 
        // transporter.sendMail(info, function (error, info) {
        //     if (error) {
        //         console.log(error);
        //         return error
        //     } else {
        //         // console.log('Email sent: ' + info.response);
        //         return otp
        //     }
        // });
        if (info)
        {
            return otp
        }
        else
        {
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
        console.log(req.body)
        const rid = req.params.role.charAt(0)
        const email = req.body.email
        // console.log(mbl.toString().length)
        // if (mbl.toString().length !== 10) {
        //     throw new Error("Mobile no should be 10 digits.")
        // }
        const found = await regModel.find({ email: email })
        console.log("found::",found)
        if (found.length !== 0) {
            const fnd_role = found[0].r_id.charAt(0)
            if (rid !== fnd_role) {

                throw new Error("you are unauthorized for this role")
            }
        }
        const otp = await otpFunction(email)
        console.log("otp",otp)
        const user =
        {
            email: email,
            otp
        }
        const newUser = new optModel(user)
        await newUser.save()
        console.log("user::",newUser)
        setTimeout(async function () { 
            console.log("delete timeout...")
            const del = await optModel.deleteMany({ email: email})
            console.log(del)
         }, 1000*30);
        return res.status(200).send({message : "OTP Message sent successfully.",otp})
    }
    catch (error) {
        res.status(400).send(error.message)
    }
}
module.exports = {
    otpLoginController
}