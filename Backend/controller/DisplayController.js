const profileModel = require("../model/client/clientProfile")

const helperModel = require("../model/helpers/helperProfile")
const saveModel = require("../model/tblSaveUser")
//fetch all user data
const fetchAllData = async (req, res) => {
    try {
        console.log("call fetchHelper function")
        role = req.params.role
        if (role === "Client") {
            console.log("call fetchHelper function")
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
                        "avatar": "$abc.avatar",
                        "rating": "$abc.rating"
                    }
                }

            ])
            if (fetchHelper.length === 0) {
                throw new Error("Data not found !")
            }
            // console.log(fetchHelper)
            return res.status(200).send(fetchHelper)
        }


    } catch (error) {
        return res.status(400).send(error.message)
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
            console.log("user Found", userFound)
            if (userFound) {
                const update = await saveModel.findOneAndUpdate(
                    { r_id: found.r_id, "hireUser.user_id": req.body.user_id },
                    { $pull: { hireUser: { user_id: req.body.user_id } } },
                    { new: true })
                console.log("remove user :: ", update)
                return res.status(200).send()
            }
            const user = found.hireUser.concat({ user_id: req.body.user_id, status: false })
            const update = await saveModel.findOneAndUpdate({ r_id: req.params.rid }, { hireUser: user }, { new: true })
            console.log("update newUser :: ", update);
            return res.status(200).send()

        }
        const newUser = new saveModel({
            r_id: req.params.rid,
            hireUser: [{ user_id: req.body.user_id, status: false }],
        })

        await newUser.save();
        console.log("newUser :: ", newUser);
        return res.status(200).send()
    }
    catch (error) {
        return res.status(400).send(error.message)
    }
}

const requestForWork = async (req, res) => {
    const userFound = await saveModel.findOne({ r_id: found.r_id, "hireUser.user_id": req.body.user_id })
    console.log("user Found", userFound)
    if (userFound) {
        const update = await saveModel.findOneAndUpdate(
            { r_id: found.r_id, "hireUser.user_id": req.body.user_id },
            { $pull: { hireUser: { user_id: req.body.user_id } } },
            { new: true })
        console.log("remove user :: ", update)
        return res.status(200).send()
    }
}

const searching = async (req, res) => {
    let field = req.params.field
    // req.params.seachValue
    console.log(field, req.params.searchValue)
    let field2 = ""
    field === "Location" ? field = "address.pincode" : field === "Name" ? field = "name" : field === "Work Category" ? field2 = "workDetails.category" : field === "Work Timing" ? field2 = "workTime" : ""
    if (field2) {
        console.log("field2::",field2)
        const found = await helperModel.find({ [field2]: req.params.searchValue })
        console.log(found)
        if (found.length === 0) {
            console.log(found)
            req.params.role = "Client"
            fetchAllData(req, res)
        }
        else {
            
//             const all = await profileModel.find()
//             const idIndex = all.findIndex((c) => c.r_id === found);
// console.log("index::",idIndex)
            const foundHelper = found.map(async (val) => await profileModel.find({ r_id: val.r_id }))
            // const foundHelper = await profileModel.find({ r_id: found[1].r_id })
            console.log("found :: ", foundHelper)
            if (foundHelper.length !== 0) {

                const fetchHelper = {
                    r_id: foundHelper[0].r_id,
                    workTime: found[0].workTime,
                    profession_mbl: foundHelper[0].profession_mbl,
                    "workDetails.category": found[0].workDetails[0].category,
                    "name": foundHelper[0].name,
                    "dob": foundHelper[0].dob,
                    "avatar": foundHelper[0].avatar,
                    "rating": foundHelper[0].rating
                }

                return res.status(200).send(fetchHelper)
            }
        }
    }
    else if (field) {
        console.log("field::",field)
        const found = await profileModel.find({ [field]: req.params.searchValue })
        if (found.length === 0) {
            console.log("not found :: ",found)
            req.params.role = "Client"
            fetchAllData(req, res)
        }

        else {
            const foundHelper = await helperModel.find({ r_id: found.r_id })
            console.log("not found :: ", foundHelper)
            if (foundHelper.length !== 0) {

                const fetchHelper = {
                    r_id: foundHelper.r_id,
                    workTime: foundHelper.workTime,
                    profession_mbl: found.profession_mbl,
                    "workDetails.category": foundHelper.workDetails.category,
                    "name": found.name,
                    "dob": found.dob,
                    "avatar": found.avatar,
                    "rating": found.rating
                }

                return res.status(200).send(fetchHelper)
            }
            
        }
    }
}

module.exports = {

    fetchAllData,
    saveUserData,
    fetchSaveUser,
    hireUser,
    requestForWork,
    searching
}