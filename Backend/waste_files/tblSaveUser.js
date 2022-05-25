const mongoose = require('mongoose');
console.log('save Profile model file ...............');

const saveUserSchema = new mongoose.Schema(
    {
        r_id: {
            type: String,
            ref: 'tblC_Profile',
        },
        saveUser: [
            {
                user_id: String,
            }
        ],
    },
    {
        timestamps: true,
    }
);


const saveModel = mongoose.model(
    'tblSaveUser',
    saveUserSchema,
    'tblSaveUser'
);
module.exports = saveModel;
