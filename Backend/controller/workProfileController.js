const profileModel = require("../model/client/clientProfile")
const regModel = require("../model/tblReg")
const workProfileModel = require("../model/helpers/helperProfile")

const createWorkProfile = async (req, res) => {
    console.log("profile::");
    try {

        const r_id = req.params.rid
        if (!r_id.charAt(0) === "H") {
            throw new Error("You are not authorized to add work details!")
        }
        const workDetail = { r_id, ...req.body }
        // console.log("final user :: ",user);
        const workProfile = new workProfileModel(workDetail)
        console.log(workProfile);
        await workProfile.save()
        res.status(200).send(workProfile)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports = {
    createWorkProfile,

}