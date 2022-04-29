
const mongoose = require("mongoose")
const validator = require("validator")

console.log("helper profile model file ...............")
const regModel = require("../../model/tblReg")
const helperSchema = new mongoose.Schema({

    r_id: {
        type: String,
        ref: "tblC_Profile"
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
            exprience: {
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



const helpermodel = mongoose.model("tblH_Profile", helperSchema, "tblH_Profile")
module.exports = helpermodel