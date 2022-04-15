
const mongoose = require("mongoose")
const validator = require("validator")

console.log("Client Profile model file ...............")
const regModel = require("../../model/tblReg")

const clientSchema = new mongoose.Schema({

    r_id: {
        type: String,
        ref: "tblReg"
    },
    name: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    // avatar: {
    //     type: Buffer,
    //     required: true,
    // },
    // aadhar_card: {
    //     type: Buffer,
    //     required: true,
    // },
    email: {
        type: String,
        unique: true,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("UserName is Invalid")
            }
        },
        lowercase: true
    },
    address: [
        {
            state: {
                type: String,
                required: true,
                lowercase: true,
            },
            city: {
                type: String,
                required: true,
                lowercase: true,
            },
            landmark: {
                type: String,
                required: true,
                lowercase: true,
                trim: true,
            },
            pincode:
            {
                type: Number,
                required: true,
                min: 6,
                trim: true
            },
            h_name: {
                type: String,
                required: true,
                trim: true,
            },
            houseNo: {
                type: String,
                required: true,
                uppercase: true,
                trim: true
            }
        }
    ],
    alt_mob_num: {
        type: Number,
       required: false,
        default:0,
        trim: true,
        validate: {
            validator: function (val) {
                return val.toString().length === 10 || val == 0
            },
            message: val => `${val.value} has to be 10 digits`
        }
    },
    about: {
        type: String,
        max: 300,
        required: true,
    },
}, {
    timestamps: true
})

//remove delete user as well as profile
clientSchema.pre('remove',async function (next) {
    const user = this
    console.log("delete user with profile model file");
    await regModel.deleteMany({ r_id: user.r_id })
    next()
})


const clientmodel = mongoose.model("tblC_Profile", clientSchema, "tblC_Profile")
module.exports = clientmodel