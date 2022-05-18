
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const validator = require("validator")

console.log("registeration model file ...............")

const regSchema = new mongoose.Schema({

    r_id: {
        type: String,
        unique: true,
        required: true,
    },

    email: {
        type: String,
    
        lowercase: true,
    },
    // mob_num: {
    //     type: Number,
    //     required: true,
    //     trim: true,
    //     validate: {
    //         validator: function (val) {
    //             return val.toString().length === 10
    //         },
    //         message: val =>  `${val.value} has to be 10 digits`
    //     }

    // }
},
    {
    timestamps: true
})

//convert plain password to hash password
//save event 
// regSchema.pre('save', async function (next) {

//     console.log("just before saving..");
//     const user = this

//     //here check if password modify then the convert into hash
//     if (user.isModified('password')) {
//         console.log("isModified");
//         user.password = await bcrypt.hash(user.password, 8)
//     }
//     next()
// })

//token
//methods are accessible on instances cals instanceMethod
regSchema.methods.generateAuthToken = async function () {
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


//assign role
//statics methods accessible on model calls modelMethods
// regSchema.statics.assignRole = async (role) => {
//     console.log("role funcrtion",role);
//     if (role === "Client")
//     {
//         return "C"
//     }
//     else if(role === "Helper") {
//         return "H"
//     } else
//     {
//         throw new Error("Role is unable to assign")
//     }
// }

//login check
//statics methods accessible on model calls modelMethods
// regSchema.statics.findByCredentials = async (uname, password) => {
//     console.log("user login");
//     const mail = await userModel.findOne({ uname })//short hand syntax
//     // console.log(mail);
//     if (mail === null) {
//         throw new Error("User not found")
//     }
//     const ispass = await bcrypt.compare(password, mail.password)
//     // console.log(ispass);
//     if (!ispass) {
//         throw new Error("password not match")
//     }
//     return mail
// }

const regmodel = mongoose.model("tblReg", regSchema, "tblReg")
module.exports = regmodel