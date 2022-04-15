
const mongoose = require("mongoose")
const validator = require("validator")

console.log("helper profile model file ...............")
const regModel = require("../../model/tblReg")
const helperSchema = new mongoose.Schema({

    r_id: {
        type: String,
        ref: "tblReg"
    },
    // avatar: {
    //     type: Buffer,
    //     required: true,
    // },
    // aadhar_card: {
    //     type: Buffer,
    //     required: true,
    // },
    name: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: false,
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
            name: {
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
        required: true,
        trim: true,
        max: 10,
        min: 10,
    },
    gender: {
        type: String,
        required: true,
        trime: true,
        lowercase: true,
    },
    education: [
        {
            ssc: {
                type: Boolean,
                default: 'no',
            },
            hsc: {
                type: Boolean,
                default: 'no',
            },
            bachelor: {
                type: Boolean,
                default: 'no',
                degree: {
                    type: String,
                    trim: true
                }
            }
        }
    ],
    skills: [
        {
            role: {
                type: String,
                required: true,
            },
        }
    ],
    dob: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                return (
                    value.getTime() < Date.now() - 365 * 24 * 60 * 60 * 1000
                );
            },
            message:
                "An age must be at least 1 year from now .",
        }
    },
    languages: [
        {
            language: {
                type:String,
            }
        }
    ],
    about: {
        type: String,
        max: 300,
        required: true,
    },
}, {
    timestamps: true
})

//remove delete user as well as profile
clientSchema.pre('remove', async function (next) {
    const user = this
    console.log("delete user with profile model file");
    await regModel.deleteMany({ r_id: user.r_id })
    next()
})

const helpermodel = mongoose.model("tblH_Profile", helperSchema, "tblH_Profile")
module.exports = helpermodel