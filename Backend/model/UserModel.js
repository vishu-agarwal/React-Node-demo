const mongoose = require('mongoose');
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema(
    {
        r_id: {
            type: String,
            unique: true,
            required: true,
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
        },
        otp: {
            type: String,
            trim: true,
        },
        name: {
            type: String,
            lowercase: true,
            trim: true,
        },
        avatar: {
            type: Object,
        },
        aadhar_card: {
            type: String,
        },
        dob: {
            type: String,
        },
        is_profile: {
            type: Boolean,
            default: false
        },
        mobile_number: {
            type: Number,
            trim: true,
            validate: {
                validator: function (val) {
                    return val.toString().length === 10 || val == 0;
                },
                message: (val) => `${val.value} has to be 10 digits`,
            },
        },
        gender: {
            type: String,
            trim: true,
        },
        married: {
            type: Boolean,
            default: false,
        },
        physical_disable: {
            type: Boolean,
            default: false,
        },
        address:
        {
            state: {
                type: String,
                trim: true,
                lowercase: true,
            },
            city: {
                type: String,
                trim: true,
                lowercase: true,
            },
            pincode: {
                type: String,
                min: 6,
                trim: true,
            },
            landmark: {
                type: String,
                lowercase: true,
                trim: true,
            },
            house_name: {
                type: String,
                lowercase: true,
                trim: true,
            },
            house_no: {
                type: String,
                uppercase: true,
                trim: true,
            },
        },
        alternate_mobile_number: {
            type: Number,
            trim: true,
            validate: {
                validator: function (val) {
                    return val.toString().length === 10 || val == 0;
                },
                message: (val) => `${val.value} has to be 10 digits`,
            },
        },
        about: {
            type: String,
            max: 300,
        },
        saved_user: [
            {
                user_id: String,
            }
        ],
        rating: [
            {// userId is which users give rates this user
                user_id: {
                    type: String,
                },
                rate: {
                    type: Number,
                }
            }
        ],
    },
    {
        timestamps: true,
    }
);

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ id: user._id.toString() }, process.env.JSON_TOKEN)
    return token
}

const userModel = mongoose.model(
    'users',
    userSchema,
    'users'
);
module.exports = userModel;
