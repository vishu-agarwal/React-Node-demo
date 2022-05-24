const mongoose = require('mongoose');
// const validator = require('validator');
const jwt = require("jsonwebtoken")
console.log(' Profile model file ...............');
// const regModel = require('./tblReg');
// const avatarModel = require('./tblProfileAvatar')
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
        isProfile: {
            type: Boolean,
            default: false
        },
        mob_num: {
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
        isMarried: {
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
                    // required: true,
                    trim: true,
                },
                houseNo: {
                    type: String,
                    // required: true,
                    uppercase: true,
                    trim: true,
                },
            },
        alt_mob_num: {
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
        about: {
            type: String,
            max: 300,
            // required: true,
        },
        saveUser: [
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
    //console.log(user)
    // toString becouse sign method wants string
    console.log("tokenMethod");
    // console.log(user._id.toString());
    const token = jwt.sign({ id: user._id.toString() }, process.env.JSON_TOKEN)
    console.log(token);
    //save token to db
    // user.tokens = user.tokens.concat({ token })//token:token
    // await user.save()

    return token
}


// check alternate password and registered no is not same
userSchema.statics.findByCredentials = async (mob_num, r_id) => {
    console.log('Check mobile no');
    const ismbl = await regModel.find({ r_id, mob_num }); //short hand syntax
    // console.log(ismbl);
    if (ismbl.length !== 0) {
        throw new Error(
            'Alternate Mobile No. should be different from Registerd/Login Number.'
        );
    }
    return ismbl;
};
//remove delete user as well as profile
userSchema.pre('remove', async function (next) {
    const user = this;
    console.log('delete user with profile model file');
    await regModel.deleteMany({ r_id: user.r_id });
    await avatarModel.deleteMany({ r_id: user.r_id });
    next();
});

const userModel = mongoose.model(
    'UserModel',
    userSchema,
    'UserModel'
);
module.exports = userModel;
