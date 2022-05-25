const mongoose = require('mongoose');
console.log('hire Request model file ...............');

const hireRequestSchema = new mongoose.Schema(
    {
        r_id: {
            type: String,
            ref: 'tblC_Profile',
        },
        requested_user: [
            {
                user_id: String,
                status: String,
                work: Array,
                from_date: String,
                to_date: String,
                from_time: String,
                to_time: String,
                description: String,
                message : String
            }
        ]
    },
    {
        timestamps: true,
    }
);


const hireRequestModel = mongoose.model(
    'hire_request',
    hireRequestSchema,
    'hire_request'
);
module.exports = hireRequestModel;
