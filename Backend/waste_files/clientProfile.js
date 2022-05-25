const mongoose = require('mongoose');
const validator = require('validator');

console.log('Client Profile model file ...............');
const regModel = require('../model/tblReg');
const avatarModel = require('../model/tblProfileAvatar')
const clientSchema = new mongoose.Schema(
  {
    r_id: {
      type: String,
      ref: 'tblReg',
    },
    name: {
      type: String,
      // required: true,
      lowercase: true,
      trim: true,
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
    address: [
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
    ],
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

// check alternate password and registered no is not same
clientSchema.statics.findByCredentials = async (mob_num, r_id) => {
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
clientSchema.pre('remove', async function (next) {
  const user = this;
  console.log('delete user with profile model file');
  await regModel.deleteMany({ r_id: user.r_id });
  await avatarModel.deleteMany({ r_id: user.r_id });
  next();
});

const clientmodel = mongoose.model(
  'tblC_Profile',
  clientSchema,
  'tblC_Profile'
);
module.exports = clientmodel;
