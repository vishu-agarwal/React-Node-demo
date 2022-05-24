const profileModel = require("../model/clientProfile")
const regModel = require("../model/tblReg")
const workProfileModel = require("../model/WorkDetailsModel")

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
        console.log(workProfile, "==create")
        return res.status(200).send(workProfile)
    } catch (error) {
        return res.status(400).send(error.message)
    }
}
const fetchWorkDetails = async (req, res) => {
    try {
        console.log("work params id :: ", req.params.rid)
        const isunique = await workProfileModel.findOne({ r_id: req.params.rid })
        if (isunique.length === 0) {
            throw new Error("Please add work details available!");
        }
        else {
            console.log(isunique)
            return res.status(200).send(isunique)
        }
    } catch (error) {
        return res.status(400).send(error.message)
    }
}
const updateWorkDetails = async (req, res) => {
    //which field are allowed to update
    try {
        const r_id = req.params.rid
        const found = await workProfileModel.find({ r_id })
        if (found.length === 0) {
            throw new Error("Please first save you Working Details!")
        }
        const workDetail = await workProfileModel.findOneAndUpdate({ r_id }, { ...req.body }, { new: true })
        if (!workDetail) {
            throw new Error("Some Problem while updating working details!")
        }
        console.log(workDetail,"update")
        return res.status(200).send(workDetail)
        // return res.send(isunique)
    } catch (error) {
       return res.status(404).send(error.message)
    }
}
module.exports = {
    createWorkProfile,
    fetchWorkDetails,
    updateWorkDetails,
}