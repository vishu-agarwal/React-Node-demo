
const mongoose = require("mongoose")
const validator = require("validator")

console.log("helper profile model file ...............")
// const regModel = require("./tblReg")
const workSchema = new mongoose.Schema({

    r_id: {
        type: String,
        ref: "UserModel"
    },
    profession_mbl: {
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
    workTime: {
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
    workDetails: [
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



const workModel = mongoose.model("WorkDetailsModel", workSchema, "WorkDetailsModel")
module.exports = workModel