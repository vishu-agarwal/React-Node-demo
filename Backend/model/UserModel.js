const mongoose = require('mongoose');
const jwt = require("jsonwebtoken")
console.log(' Profile model file ...............');
const userSchema = new mongoose.Schema(
    {
        r_id: {
            type: String,
            unique: true,
            required: true,
        },
        email: {
            type: String,

            lowercase: true,
        },
        otp: {
            type: String,

            trim: true,
        },
        name: {
            type: String,
            // required: true,
            lowercase: true,
            trim: true,
        },
        avatar: {
            type: Object,
            // required: true,
        },
        aadhar_card: {
            type: String,
            // required: true,
        },
        dob: {
            type: String,
            // required: true,
            // validate: {
            //   validator: function (value) {
            //     return value.getTime() < Date.now() - 365 * 24 * 60 * 60 * 1000;
            //   },
            //   message: 'An age must be at least 1 year from now .',
            // },
        },
        is_profile: {
            type: Boolean,
            default: false
        },
        mobile_number: {
            type: Number,
            // required: false,
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
            // required: true,
            trim: true,

        },
        married: {
            type: Boolean,
            // required: true,
            default: false,
        },
        physical_disable: {
            type: Boolean,
            // required: true,
            default: false,
        },
        address: 
            {
                state: {
                    type: String,
                    // required: true,
                    trim: true,
                    lowercase: true,
                },
                city: {
                    type: String,
                    // required: true,
                    trim: true,
                    lowercase: true,
                },
                pincode: {
                    type: Number,
                    // required: true,
                    min: 6,

                    trim: true,
                },
                landmark: {
                    type: String,
                    // required: true,
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
                    // required: true,
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
            // required: true,
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
