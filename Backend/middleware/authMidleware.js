const jwt = require("jsonwebtoken")
const userModel = require("../model/UserModel");

const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "")
        const decode = jwt.verify(token, process.env.JSON_TOKEN)
        const user = await userModel.findOne({ _id: decode.id })
        if (!user) {
            throw new Error()
        }
        req.user = user
        req.token = token
        next()
    } catch (error) {
       return res.status(400).send("You need to login!")
    }
}

module.exports = auth