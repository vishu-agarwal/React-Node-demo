const jwt = require("jsonwebtoken")
const regModel = require("../model/tblReg")

const auth = async (req, res, next) => {
    console.log(req.method, req.path);
    console.log("middleware file ...................")
    try {

        const token = req.header("Authorization").replace("Bearer ", "")
        //console.log("token : " + token);

        const decode = jwt.verify(token, process.env.JSON_TOKEN)
        //console.log(decode);

        const user = await regModel.findOne({ _id: decode.id })
        //console.log(user);

        if (!user) {
            throw new Error()
        }

        req.user = user
        req.token = token

        next()

    } catch (error) {
        res.status(404).send("You need to login!")
    }
}

module.exports = auth