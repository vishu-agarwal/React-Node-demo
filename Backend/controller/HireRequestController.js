const hireRequestModel = require("../model/HireRequestModel")
const profileModel = require("../model/clientProfile");
const userModel = require("../model/UserModel");

const createHireRequest = async (req, res) => {
    console.log("profile::");
    try {
        const r_id = req.params.rid
        const hireUser = req.body
        console.log(...req.body)
        console.log(req.body)
        const found = await hireRequestModel.findOne({ r_id: r_id })
        if (found) {
            const update = await hireRequestModel.findOneAndUpdate({ r_id: req.params.rid }, { hireUser: found.hireUser.concat(...req.body) }, { new: true })
            console.log("update newUser :: ", update);
            return res.status(200).send("hire user added")
        }
        else {
            if (!r_id.charAt(0) === "H") {
                throw new Error("You are not authorized to add work details!")
            }
            const hireDetail = { r_id, hireUser }
            console.log("final user :: ", hireDetail);
            const hireRequest = new hireRequestModel(hireDetail)
            console.log(hireRequest);
            await hireRequest.save()
            return res.status(200).send("Successfully hireRequest saved!")
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
}
const fetchHireRequest = async (req, res) => {
    try {
        // console.log("work params id :: ", req.params.rid)
        let hireRequest = []
        if (req.params.rid.charAt(0) === "C") {
            const found = await hireRequestModel.findOne({ r_id: req.params.rid })
            // console.log(found,"....found")
            if (found) {
                const helper = await Promise.all(
                    found.hireUser.map((val) => {
                        return userModel.find({ r_id: val.user_id }).then((res) => {
                            console.log("values:: ", val)
                            hireRequest.push({
                                name: res.map(val => val.name),
                                user_id: val.user_id,
                                status: val.status,
                                work: val.work,
                                fromDate: val.fromDate,
                                toDate: val.toDate,
                                fromTime: val.fromTime,
                                toTime: val.toTime,
                                description: val.description,
                            })
                        }).catch((error) => {
                            return res.status(400).send(error.massage)
                        })
                    }
                    ))
            }
        }
        else if (req.params.rid.charAt(0) === "H") {
            const found = await hireRequestModel.find({ "hireUser.user_id": req.params.rid })
            if (found) {
                const helper = await Promise.all(
                    found.map((val) => {
                        return userModel.find({ r_id: val.r_id }).then((res) => {
                            const data = val.hireUser.find((value) => value.user_id === req.params.rid)
                            hireRequest.push({
                                name: res.map(val => val.name),
                                user_id: val.r_id,
                                status: data.status,
                                work: data.work,
                                fromDate: data.fromDate,
                                toDate: data.toDate,
                                fromTime: data.fromTime,
                                toTime: data.toTime,
                                description: data.description
                            })

                        }).catch((error) => {
                            return res.status(400).send(error.massage)
                        })
                    }
                    ))
            }
        }
        console.log(hireRequest, typeof hireRequest)
        return res.status(200).send(hireRequest)

    } catch (error) {
        res.status(400).send(error.message)
    }
}
const fetchSingleHireRequest = async (req, res) => {
    try {
        console.log("work params id :: ", req.params.hid)
        const found = await hireRequestModel.findOne({ r_id: req.params.rid })
        if (found) {
            const foundHelper = found.hireUser.filter((val) => {
                if (val.user_id === req.params.hid) {
                    return val
                }
            })
            console.log("found Helper :: ", foundHelper)
            if (foundHelper) {
                return res.status(200).send({ ...foundHelper })
            }
        }
        return res.status(200).send("Please fill deatils for enquiry!")
    } catch (error) {
        res.status(400).send(error.message)
    }
}
const acceptClientRequest = async (req, res) => {
    try {
        const found = await hireRequestModel.findOne({ r_id: req.params.cid })
        if (found) {
            console.log("found:::", found)
            const idIndex = found.hireUser.findIndex((c) => c.user_id === req.params.rid);
            if (found.hireUser[idIndex].user_id === req.params.rid) {
                found.hireUser[idIndex].status = "hired!"
            }
            const update = await found.save();
            console.log("old user :: \n", update)
            return res.status(200).send();
        }

    } catch (error) {
        res.status(400).send(error.message)
    }
}
const rejectClientRequest = async (req, res) => {
    try {
        const found = await hireRequestModel.findOne({ r_id: req.params.cid })
        if (found) {
            console.log("found:::", found)
            const idIndex = found.hireUser.findIndex((c) => c.user_id === req.params.rid);
            if (found.hireUser[idIndex].user_id === req.params.rid) {
                found.hireUser[idIndex].status = "reject!"
            }
            const update = await found.save();
            console.log("old user :: \n", update)
            return res.status(200).send();
        }

    } catch (error) {
        res.status(400).send(error.message)
    }
}

const deleteHelperRequest = async (req, res) => {
    const update = await hireRequestModel.findOneAndUpdate({ r_id: req.params.rid }, { $pull: { hireUser: { user_id: req.params.hid } } }, { new: true })
    console.log("remove request :: ", update)
    return res.status(200).send("")
}
const updateHireRequest = async (req, res) => {
    //which field are allowed to update
    try {
        const found = await hireRequestModel.findOne({ r_id: req.params.rid })
        // console.log("user_id", req.body)
        // console.log("r_id", req.params.rid)
        if (found) {

            const idIndex = found.hireUser.findIndex((c) => c.user_id === req.body.user_id);
            // console.log("found old user", idIndex);
            if (idIndex < 0) {
                // console.log("found new user");
                const user = found.hireUser.concat(req.body)

                const update = await hireRequestModel.findOneAndUpdate({ r_id: req.params.rid }, { hireUser: user }, { new: true })
                // console.log("update newUser :: ", update);
                return res.status(200).send()
            }

            else if (found.hireUser[idIndex].user_id === req.body.user_id) {

                found.hireUser[idIndex].status = req.body.status,
                    found.hireUser[idIndex].work = req.body.work,
                    found.hireUser[idIndex].fromDate = req.body.fromDate,
                    found.hireUser[idIndex].toDate = req.body.toDate,
                    found.hireUser[idIndex].fromTime = req.body.fromTime,
                    found.hireUser[idIndex].toTime = req.body.toTime,
                    found.hireUser[idIndex].description = req.body.description

                const update = await found.save();
                // console.log("old user :: \n", update)
                return res.status(200).send();
            }

        }

    } catch (error) {
        res.status(400).send(error.message)
    }
}
const hireUser = async (req, res) => {
    try {
        // console.log("save user")

        const found = await hireRequestModel.findOne({ r_id: req.params.rid })
        // console.log(req.body.user_id);
        // console.log("found user :: ",found)
        if (found) {
            // if (req.body === null) { res.status(200).send(found) }

            // console.log(req.body)
            const userFound = await hireRequestModel.findOne({ r_id: found.r_id, "hireUser.user_id": req.body.user_id })
            console.log("user Found", userFound)
            if (userFound) {
                const update = await hireRequestModel.findOneAndUpdate(
                    { r_id: found.r_id, "hireUser.user_id": req.body.user_id },
                    {

                    },
                    { new: true })
                console.log("remove user :: ", update)
                return res.status(200).send()
            }
            const user = found.hireUser.concat({
                user_id: req.body.user_id,
                status: false,
                work: req.body.work,
                formDate: req.body.fromDate,
                toDate: req.body.toDate,
                fromTime: req.body.fromTime,
                toTime: req.body.toTime,
                description: req.body.description
            })
            const update = await hireRequestModel.findOneAndUpdate({ r_id: req.params.rid }, { hireUser: user }, { new: true })
            console.log("update newUser :: ", update);
            return res.status(200).send(update)

        }
        else {
            const newUser = new hireRequestModel({
                r_id: req.params.rid,
                hireUser: [{
                    user_id: req.body.user_id,
                    status: false,
                    work: req.body.work,
                    formDate: req.body.fromDate,
                    toDate: req.body.toDate,
                    fromTime: req.body.fromTime,
                    toTime: req.body.toTime,
                    description: req.body.about
                }],
            })

            await newUser.save();
            console.log("newUser :: ", newUser);
            return res.status(200).send()
        }
    }
    catch (error) {
        return res.status(400).send(error.message)
    }
}

module.exports = {
    hireUser,
    createHireRequest,
    fetchHireRequest,
    fetchSingleHireRequest,
    updateHireRequest,
    acceptClientRequest,
    rejectClientRequest,
    deleteHelperRequest
}