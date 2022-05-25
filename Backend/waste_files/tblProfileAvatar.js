const mongoose = require('mongoose');
// const validator = require('validator');

console.log('Client Profile model file ...............');
const regModel = require('./tblReg');

const avatarSchema = new mongoose.Schema(
    {
        r_id: {
            type: String,
            ref: 'tblReg',
        },
        
        avatar: {
            type: Object,
            // required: true,
        },
    },
    {
        timestamps: true,
    }
);



const avatarModel = mongoose.model(
    'tblProfileAvatar',
    avatarSchema,
    'tblProfileAvatar'
);
module.exports = avatarModel;
