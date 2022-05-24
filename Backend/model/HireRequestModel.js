const mongoose = require('mongoose');
console.log('hire Request model file ...............');

const hireRequestSchema = new mongoose.Schema(
    {
        r_id: {
            type: String,
            ref: 'tblC_Profile',
        },
        hireUser: [
            {
                user_id: String,
                status: String,
                work: Array,
                fromDate: String,
                toDate: String,
                fromTime: String,
                toTime: String,
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
    'tblHireRequest',
    hireRequestSchema,
    'tblHireRequest'
);
module.exports = hireRequestModel;
