
const mongoose = require("mongoose")

const validator = require("validator")

console.log("opt model file ...............")

const otpSchema = new mongoose.Schema({

    mob_num: {
        type: Number,
        required: true,
        trim: true,
        validate: {
            validator: function (val) {
                return val.toString().length === 10
            },
            message: val => { throw new Error(`${val.value} has to be 10 digits`) }
        }

    },
    otp: {
        type: String,
        required: true,
        minlength: 6,
        trim: true,
        validate: {
            validator: function (val) {
                return val.toString().length === 6
            },
            message: val => { throw new Error(`${val.value} has to be 6 digits`) }
        }
    },
},
    {
        timestamps: true
    })


const otpModel = mongoose.model("tempOtpModel", regSchema, "tempOtpModel")
module.exports = otpModel