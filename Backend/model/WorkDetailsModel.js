
const mongoose = require("mongoose")
const validator = require("validator")

console.log("helper profile model file ...............")
// const regModel = require("./tblReg")
const workSchema = new mongoose.Schema({

    r_id: {
        type: String,
        ref: "UserModel"
    },
    profession_mobile_number: {
        type: Number,
        required: true,
        trim: true,
        validate: {
            validator: function (val) {
                return val.toString().length === 10
            },
            message: val => `${val.value} has to be 10 digits`
        }

    },
    work_time: {
        type: String,
        required: true,
    },
    education: {
        type: String,
        required: true
    },
    other_education: {
        type: String,
        required: true
    },
    work_details: [
        {
            category: {
                type: String,
                // required: true,
                trim: true,
                // lowercase: true,
            },
            experience: {
                type: String,
                // required: true,
                trim: true,
                // lowercase: true,
            },
            salary: {
                type: String,
                // required: true,
                // lowercase: true,
                trim: true,
            },
        },
    ],
    languages: [
        {
            language: {
                type: String,
                required: true,
            }
        }
    ],

}, {
    timestamps: true
})



const workModel = mongoose.model("work_details", workSchema, "work_details")
module.exports = workModel