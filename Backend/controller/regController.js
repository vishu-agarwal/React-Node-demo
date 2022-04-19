const regModel = require("../model/tblReg")
const optModel = require("../model/tempOtpModel")

const fast2sms = require('fast-two-sms')

async function otpFunction(mbl) {
    // return new Promise(async (resolve, reject) => {
    const to = mbl
    const otp = Math.floor(100000 + Math.random() * 900000)
    const text = 'MyHelpers Login OTP is :: ' + otp + ' . \nIt is expired after One minute! '
    try {
        const response = await fast2sms.sendMessage({ authorization: process.env.SMS_API_KEY, message: text, numbers: [to] })
        if (response) {
            return otp
        }
        else {
            throw new Error("Some problem while sending OTP !")
        }
        // fast2sms.sendMessage({ authorization: process.env.SMS_API_KEY, message: text, numbers: [to] })
        //     .then((res) => {
        //         console.log(res)
        //         return resolve(res)
        //     }).catch((error) => {
        //         console.log(error)
        //         return reject("Some problem while sending OTP!")
        //     })      
    } catch (error) {
        console(error);
        return error;
    }
}
const otpLoginController = async (req, res) => {
    try {
        console.log("otp login controller ")
        const rid = req.params.role.charAt(0)
        const mbl = req.body.mob_num
        // console.log(mbl.toString().length)
        if (mbl.toString().length !== 10) {
            throw new Error("Mobile no should be 10 digits.")
        }
        const found = await regModel.find({ mob_num: mbl })
        if (found.length !== 0) {
            const fnd_role = found[0].r_id.charAt(0)
            if (rid !== fnd_role) {

                throw new Error("you are unauthorized for this role")
            }
        }
        const otp = await otpFunction(mbl)
        console.log(otp)
        const user =
        {
            mob_num: mbl,
            otp
        }
        const newUser = new optModel(user)
        await newUser.save()
        setTimeout(async function () { 
            console.log("delete timeout...")
            const del = await optModel.deleteMany({ mob_num: mbl })
            console.log(del)
         }, 1000*60);
        return res.status(200).send("OTP Message sent successfully.")
    }
    catch (error) {
        res.status(400).send(error.message)
    }
}
module.exports = {
    otpLoginController
}