const workProfileModel = require("../model/WorkDetailsModel")

// add profile details of helper
const createWorkProfile = async (req, res) => {
    try {
        const r_id = req.params.rid
        if (!r_id.charAt(0) === "H") {
            throw new Error("You are not authorized to add work details!")
        }
        const workDetail = { r_id, ...req.body }
        const workProfile = new workProfileModel(workDetail)
        await workProfile.save()
        return res.status(200).send(workProfile)
    } catch (error) {
        return res.status(400).send(error.message)
    }
}
//fetch work details related to helper
const fetchWorkDetails = async (req, res) => {
    try {
        const isunique = await workProfileModel.findOne({ r_id: req.params.rid })
        if (!isunique) {
            throw new Error("Please add work details available!");
        }
        else {
            return res.status(200).send(isunique)
        }
    } catch (error) {
        return res.status(400).send(error.message)
    }
}
//update work details 
const updateWorkDetails = async (req, res) => {
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
        return res.status(200).send(workDetail)
    } catch (error) {
        return res.status(404).send(error.message)
    }
}

module.exports = {
    createWorkProfile,
    fetchWorkDetails,
    updateWorkDetails,
}