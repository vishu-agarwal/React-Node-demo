const hireRequestModel = require("../model/tblHireRequest")


const createHireRequest = async (req, res) => {
    console.log("profile::");
    try {
        const r_id = req.params.rid
        const hireUser = req.body
        console.log(...req.body)
        console.log(req.body)
        const found = await hireRequestModel.findOne({ r_id })
        if (found) {

            const update = await hireRequestModel.findOneAndUpdate({ r_id: req.params.rid }, { hireUser: req.body }, { new: true })
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
        console.log("work params id :: ", req.params.rid)
        const found = await hireRequestModel.findOne({ r_id: req.params.rid })
        // const userFound = await hireRequestModel.findOne({ r_id: req.params.rid, "hireUser.user_id": req.body.user_id })
        console.log("found",found.hireUser)
        return res.status(200).send(found.hireUser)

    } catch (error) {
        res.status(400).send(error.message)
    }

}
const updateHireRequest = async (req, res) => {
    //which field are allowed to update
    try {
        const r_id = req.params.rid
        const userFound = await hireRequestModel.findOne({ r_id: found.r_id, "hireUser.user_id": req.body.user_id })
        console.log("user Found", userFound)
        if (userFound) {
            if (!userFound.status) {
                const update = await hireRequestModel.findOneAndUpdate(
                    { r_id: found.r_id, "hireUser.user_id": req.body.user_id },
                    {
                        ...req.body
                    },
                    { new: true })
                console.log("remove user :: ", update)
                return res.status(200).send("update done!")
            }
        }

    } catch (error) {
        res.status(404).send(error.message)
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
    updateHireRequest
}