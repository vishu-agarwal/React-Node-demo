
const mongoose = require("mongoose")

const validator = require("validator")

console.log("opt model file ...............")

const otpSchema = new mongoose.Schema({

    // mob_num: {
    //     type: Number,
    //     required: true,
    //     trim: true,
    //     validate: {
    //         validator: function (val) {
    //             return val.toString().length === 10
    //         },
    //         message: val => `${val.value} has to be 10 digits`
    //     }

    // },

    email: {
        type: String,
       
        lowercase: true,
    },
    otp: {
        type: String,
        required: true,
        trim: true,
    },
},
    {
        timestamps: true
    })


const otpModel = mongoose.model("tempOtpModel", otpSchema, "tempOtpModel")
module.exports = otpModel