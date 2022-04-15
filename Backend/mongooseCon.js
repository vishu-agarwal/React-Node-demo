
const mongoose = require("mongoose")

// const validator = require("validator")

const conUrl = process.env.MongoURL
const dbname = 'MyHelpers'

mongoose.connect(`${conUrl}/${dbname}`).then(() => { console.log("connected with mongodb"); })
