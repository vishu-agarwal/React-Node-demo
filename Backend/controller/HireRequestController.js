const hireRequestModel = require("../model/HireRequestModel")
const userModel = require("../model/UserModel");

// add hire request from hire form
const createHireRequest = async (req, res) => {
    try {
        const r_id = req.params.rid
        const requested_user = req.body
        const found = await hireRequestModel.findOne({ r_id: r_id })
        if (found) {
            const update = await hireRequestModel.findOneAndUpdate({ r_id: req.params.rid },
                { requested_user: found.requested_user.concat(...req.body) }, { new: true })
            return res.status(200).send(update)
        }
        else {
            if (!r_id.charAt(0) === "H") {
                throw new Error("You are not authorized to add work details!")
            }
            const hireDetail = { r_id, requested_user }
            const hireRequest = new hireRequestModel(hireDetail)
            await hireRequest.save()
            return res.status(200).send(hireRequest)
        }
    } catch (error) {
        return res.status(400).send(error.message)
    }
}
// fetch requests of enquiries and hired status
const fetchHireRequest = async (req, res) => {
    try {
        let hireRequest = []
        if (req.params.rid.charAt(0) === "C") {
            const found = await hireRequestModel.findOne({ r_id: req.params.rid })
            if (found) {
                for (let val of found.requested_user) {
                    const res = await userModel.find({ r_id: val.user_id });
                    if (res.length) {
                        hireRequest.push({
                            name: res.map(val => val.name),
                            user_id: val.user_id,
                            status: val.status,
                            work: val.work,
                            from_date: val.from_date,
                            to_date: val.to_date,
                            from_time: val.from_time,
                            to_time: val.to_time,
                            description: val.description,
                        })
                    }
                }
                return res.status(200).send(hireRequest)
            }
        }
        else if (req.params.rid.charAt(0) === "H") {
            const found = await hireRequestModel.find({ "requested_user.user_id": req.params.rid })
            if (found.length) {
                for (let val of found) {
                    const res = await userModel.find({ r_id: val.r_id });
                    if (res.length) {
                        const data = val.requested_user.find((value) => value.user_id === req.params.rid)
                        hireRequest.push({
                            name: res.map(val => val.name),
                            user_id: val.r_id,
                            status: data.status,
                            work: data.work,
                            from_date: data.from_date,
                            to_date: data.to_date,
                            from_time: data.from_time,
                            to_time: data.to_time,
                            description: data.description
                        })
                    }
                }
                return res.status(200).send(hireRequest)
            }
        }
        return res.status(200).send(hireRequest)

    } catch (error) {
        res.status(400).send(error.message)
    }
}
// fetch hire request form details of single user
const fetchSingleHireRequest = async (req, res) => {
    try {
        const found = await hireRequestModel.findOne({ r_id: req.params.rid })
        if (found) {
            const foundHelper = found.requested_user.filter((val) => {
                if (val.user_id === req.params.hid) {
                    return val
                }
            })
            if (foundHelper.length) {
                return res.status(200).send(foundHelper)
            }
        }
        return res.status(200).send("Please fill deatils for enquiry!")
    } catch (error) {
        return res.status(400).send(error.message)
    }
}
//accept request by helper and hired
const acceptClientRequest = async (req, res) => {
    try {
        const found = await hireRequestModel.findOne({ r_id: req.params.cid })
        if (found) {
            const idIndex = found.requested_user.findIndex((c) => c.user_id === req.params.rid);
            if (found.requested_user[idIndex].user_id === req.params.rid) {
                found.requested_user[idIndex].status = "hired!"
            }
            const update = await found.save();            
            return res.status(200).send();
        }
    } catch (error) {
        return res.status(400).send(error.message)
    }
}
// reject request by helper
const rejectClientRequest = async (req, res) => {
    try {
        const found = await hireRequestModel.findOne({ r_id: req.params.cid })
        if (found) {
            const idIndex = found.requested_user.findIndex((c) => c.user_id === req.params.rid);
            if (found.requested_user[idIndex].user_id === req.params.rid) {
                found.requested_user[idIndex].status = "reject!"
            }
            const update = await found.save();
            return res.status(200).send(update);
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
}
//delete request by client
const deleteHelperRequest = async (req, res) => {
    const update = await hireRequestModel.findOneAndUpdate({ r_id: req.params.rid },
        { $pull: { requested_user: { user_id: req.params.hid } } }, { new: true })
    return res.status(200).send(update)
}
// update hire request form
const updateHireRequest = async (req, res) => {
    //which field are allowed to update
    try {
        const found = await hireRequestModel.findOne({ r_id: req.params.rid })
        if (found) {
            const idIndex = found.requested_user.findIndex((c) => c.user_id === req.body.user_id);
            if (idIndex < 0) {
                const user = found.requested_user.concat(req.body)
                const update = await hireRequestModel.findOneAndUpdate({ r_id: req.params.rid },
                    { requested_user: user }, { new: true })
                return res.status(200).send(update)
            }
            else if (found.requested_user[idIndex].user_id === req.body.user_id) {
                found.requested_user[idIndex].status = req.body.status,
                    found.requested_user[idIndex].work = req.body.work,
                    found.requested_user[idIndex].from_date = req.body.from_date,
                    found.requested_user[idIndex].to_date = req.body.to_date,
                    found.requested_user[idIndex].from_time = req.body.from_time,
                    found.requested_user[idIndex].to_time = req.body.to_time,
                    found.requested_user[idIndex].description = req.body.description
                const update = await found.save();
                return res.status(200).send(update);
            }
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports = {
    createHireRequest,
    fetchHireRequest,
    fetchSingleHireRequest,
    updateHireRequest,
    acceptClientRequest,
    rejectClientRequest,
    deleteHelperRequest
}