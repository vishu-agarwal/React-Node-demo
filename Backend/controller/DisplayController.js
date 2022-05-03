const profileModel = require("../model/client/clientProfile")

const helperModel = require("../model/helpers/helperProfile")
const saveModel = require("../model/tblSaveUser")
//fetch all user data
const fetchAllData = async (req, res) => {
    try {

        role = req.params.role
        if (role === "Client") {
            //   fetchHelper = await helperModel.find()

            // const abc = await profileModel.find()

            // const totIds = abc.map((item) => {
            //     if (item.r_id.charAt(0) === "H"){
            //         return item.rating.map((id) =>
            //             id.user_id
            //         ).length
            //     }
            // }
            // );

            // const totRates = abc.map((item) =>
            //     item.rating.map((id) =>
            //         id.rate
            //     ).reduce((prev, curr) => prev + curr, 0)
            // );
            // const result = totRates.map(function (n, i) { return n / totIds[i]; })
            // console.log(totIds, totRates, result)
            // const rates = result.map((item) => {
            //     return isNaN(item) ? item = 0 : item

            // })
            // // console.log(rate)

            const fetchHelper = await helperModel.aggregate([
                {
                    $lookup:
                    {
                        from: 'tblC_Profile',
                        localField: 'r_id',
                        foreignField: 'r_id',
                        as: 'abc'
                        // "pipeline": [
                        //     { "$project": { "name": 1 } }
                        // ],
                    },
                },
                {
                    $project: {
                        r_id: 1,
                        workTime: 1,
                        profession_mbl: 1,
                        "workDetails.category": 1,
                        "name": "$abc.name",
                        "dob": "$abc.dob",
                        "rating": "$abc.rating"
                    }
                }

            ])
            if (fetchHelper.length === 0) {
                throw new Error("Data not found !")
            }
            // console.log(fetchHelper)
            res.status(200).send(fetchHelper)
        }


    } catch (error) {
        res.status(400).send(error.message)
    }

}

//save user data 
const saveUserData = async (req, res) => {
    try {
        // console.log("save user")

        const found = await saveModel.findOne({ r_id: req.params.rid })
        console.log(req.body.length !== 0)
        if (found) {
            // if (req.body === null) { res.status(200).send() }

            const userFound = await saveModel.find({ r_id: found.r_id, "saveUser.user_id": req.body.user_id })
            // console.log("user Found",userFound)
            if (userFound.length !== 0) {
                const update = await saveModel.findOneAndUpdate({ r_id: found.r_id, "saveUser.user_id": req.body.user_id }, { $pull: { saveUser: { user_id: req.body.user_id } } }, { new: true })
                console.log("removw user :: ", update)
                return res.status(200).send()
            }
            //   console.log(req.body)
            const user = found.saveUser.concat(req.body)

            const update = await saveModel.findOneAndUpdate({ r_id: req.params.rid }, { saveUser: user }, { new: true })
            console.log("update newUser :: ", update);
            return res.status(200).send()

        }
        const newUser = new saveModel({
            r_id: req.params.rid,
            saveUser: [{ user_id: req.body.user_id }],
        })

        await newUser.save();
        console.log("newUser :: ", newUser);
        return res.status(200).send()
    }
    catch (error) {
        return res.status(400).send(error.message)
    }
}
const fetchSaveUser = async (req, res) => {
    try {
        const found = await saveModel.findOne({ r_id: req.params.rid })
        // console.log(found)

        return res.status(200).send(found)

    }
    catch (error) {
        return res.status(400).send(error.message)
    }
}
const hireUser = async (req, res) => {
    try {
        // console.log("save user")

        const found = await saveModel.findOne({ r_id: req.params.rid })
        // console.log(req.body.user_id);
        // console.log("found user :: ",found)
        if (found) {
            // if (req.body === null) { res.status(200).send(found) }

            // console.log(req.body)
            const userFound = await saveModel.findOne({ r_id: found.r_id, "hireUser.user_id": req.body.user_id })
            console.log("user Found",userFound)
            if (userFound) {
                const update = await saveModel.findOneAndUpdate(
                    { r_id: found.r_id, "hireUser.user_id": req.body.user_id },
                    { $pull: { hireUser: { user_id: req.body.user_id } } },
                    { new: true })
                console.log("remove user :: ", update)
                return res.status(200).send()
            }
            const user = found.hireUser.concat({user_id : req.body.user_id,status:false})
            const update = await saveModel.findOneAndUpdate({ r_id: req.params.rid }, { hireUser: user }, { new: true })
            console.log("update newUser :: ", update);
            return res.status(200).send()

        }
        const newUser = new saveModel({
            r_id: req.params.rid,
            hireUser: [{ user_id: req.body.user_id,status:false }],
        })

        await newUser.save();
        console.log("newUser :: ", newUser);
        return res.status(200).send()
    }
    catch (error) {
        return res.status(400).send(error.message)
    }
}
module.exports = {

    fetchAllData,
    saveUserData,
    fetchSaveUser,
    hireUser,
}