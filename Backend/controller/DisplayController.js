const profileModel = require("../model/clientProfile")
const helperModel = require("../model/helperProfile")
const avatarModel = require("../model/tblProfileAvatar")
const saveModel = require("../model/tblSaveUser")
const userModel = require("../model/UserModel")
const workModel = require("../model/WorkDetailsModel")

//fetch all user data
const fetchAllData = async (req, res) => {
    try {
        console.log("call fetchHelper function")
        role = req.params.role
        if (role === "Client") {
            console.log("call fetchHelper function")
            const fetchHelper = await workModel.aggregate([
                {
                    $lookup:
                    {
                        from: 'users',
                        localField: 'r_id',
                        foreignField: 'r_id',
                        as: 'profile'
                    },
                },
                {
                    $project: {
                        r_id: 1,
                        work_time: 1,
                        profession_mobile_number: 1,
                        "work_details.category": 1,
                        "name": "$profile.name",
                        "dob": "$profile.dob",
                        "avatar": "$profile.avatar",
                        "rating": "$profile.rating",
                        status: 1
                    }
                },
            ])
            console.log(fetchHelper)
            return res.status(200).send(fetchHelper)
        }
    } catch (error) {
        return res.status(400).send(error.message)
    }
}
//save user data 
const saveUserData = async (req, res) => {
    try {
        const user = await userModel.findOne({ r_id: req.params.rid })
        console.log("save user", user.is_profile)
        if (!user.is_profile) {
            console.log("not created")
            throw new Error("Please first create your profile!")
        }
        const saveIdFound = await userModel.find({ r_id: user.r_id, "saved_user.user_id": req.body.user_id })
        console.log("user Found", saveIdFound)
        if (saveIdFound.length !== 0) {
            const removeSave = await userModel.findOneAndUpdate({ r_id: user.r_id, "saved_user.user_id": req.body.user_id }, { $pull: { saved_user: { user_id: req.body.user_id } } }, { new: true })
            console.log("remove user :: ", removeSave)
            return res.status(200).sendsend(removeSave.saved_user)
        }
        const saveNewUser = user.saved_user.concat(req.body)

        const addSave = await userModel.findOneAndUpdate({ r_id: req.params.rid }, { saved_user: saveNewUser }, { new: true })
        console.log("update newUser :: ", addSave);
        return res.status(200).send(addSave.saved_user)
    }
    catch (error) {
        return res.status(400).send(error.message)
    }
}
// const saveUserData = async (req, res) => {
//     try {
//         // console.log("save user")
//         const isProfile = await profileModel.findOne({ r_id: req.params.rid })
//         if (!isProfile) {
//             throw new Error("Please first create your profile!")
//         }
//         const found = await saveModel.findOne({ r_id: req.params.rid })
//         console.log(req.body.length !== 0)
//         if (found) {
//             // if (req.body === null) { res.status(200).send() }

//             const userFound = await saveModel.find({ r_id: found.r_id, "saveUser.user_id": req.body.user_id })
//             console.log("user Found", userFound)
//             if (userFound.length !== 0) {
//                 const update = await saveModel.findOneAndUpdate({ r_id: found.r_id, "saveUser.user_id": req.body.user_id }, { $pull: { saveUser: { user_id: req.body.user_id } } }, { new: true })
//                 console.log("removw user :: ", update)
//                 return res.status(200).sendsend(update.map((val) => val.saveUser).flat())
//             }
//             //   console.log(req.body)
//             const user = found.saveUser.concat(req.body)

//             const update = await saveModel.findOneAndUpdate({ r_id: req.params.rid }, { saveUser: user }, { new: true })
//             console.log("update newUser :: ", update);
//             return res.status(200).send(update.map((val) => val.saveUser).flat())

//         }
//         const newUser = new saveModel({
//             r_id: req.params.rid,
//             saveUser: [{ user_id: req.body.user_id }],
//         })

//         await newUser.save();
//         console.log("newUser :: ", newUser);
//         return res.status(200).send(newUser.map((val) => val.saveUser).flat())
//     }
//     catch (error) {
//         return res.status(400).send(error.message)
//     }
// }
const fetchSaveUser = async (req, res) => {
    try {
        const found = await userModel.find({ r_id: req.params.rid })
        console.log("save Users ::::::: ", found.map((val) => val.saved_user).flat())
        return res.status(200).send(found.map((val) => val.saved_user).flat())
    }
    catch (error) {
        return res.status(400).send(error.message)
    }
}

const profileAvailable = async (req, res) => {
    try {
        const found = await profileModel.findOne({ r_id: req.params.rid })
        // console.log(found)
        if (found) {
            return res.status(200).send(true)
        }
        else {
            throw new Error("Please first create your profile!")
        }
    }
    catch (error) {
        return res.status(400).send(error.message)
    }
}

const fetchAllAvatar = async (req, res) => {
    try {
        const found = await avatarModel.find()
        console.log(found)
        return res.status(200).send(found)
    }
    catch (error) {
        return res.status(400).send(error.message)
    }
}

// const foundHelperFunc = (val) => {
//     return new Promise((resolve, reject) => {

//         profileModel.find({ r_id: val.r_id }).then((res) => {
//             resolve(res)
//         }).catch((e) => {
//             reject(e)
//         })
//     })
// }

const searching = async (req, res) => {
    let field = req.query.field
    // req.params.seachValue
    console.log(field, req.query.searchValue)
    let field2 = ""
    field === "Location" ?
        field = "address.pincode"
        : field === "Name" ?
            field = "name"
            : field === "Gender" ?
                field = "gender" :
                field === "Work Category" ?
                    field2 = "work_details.category" :
                    field === "Work Timing" ?
                        field2 = "work_time" :
                        ""
    if (field2) {
        console.log("field2::", field2)
        const found = await workModel.find({ [field2]: req.query.searchValue })
        console.log(found)
        if (found.length === 0) {
            console.log(found)
            req.params.role = "Client"
            return fetchAllData(req, res)
        }
        else {
            let fetch = []
            for (let val of found) {
                const res = await userModel.find({ r_id: val.r_id });
                console.log("response::", res)
                if (res.length) {
                    fetch.push({
                        r_id: val.r_id,
                        work_details: [val.work_details.map((cat) => { return { category: cat.category } })],
                        work_time: val.work_time,
                        profession_mobile_number: val.profession_mobile_number,
                        name: res.map((val) => val.name),
                        dob: res.map((val) => val.dob),
                        avatar: res.map((val) => val.avatar),
                        rating: res.map((val) => val.rating),
                        status: val.status
                    })
                }
            }
            console.log("fetch ::", fetch)
            return res.status(200).send(fetch)
        }
    }
    else if (field) {
        let found
        console.log("field::", req.query.searchValue)
        field === "gender" ? found = await userModel.find({ [field]: req.query.searchValue })
            :
            found = await userModel.find({ $where: `/^${req.query.searchValue}.*/.test(this.${field})` })
        console.log("found::", found)
        if (found.length === 0) {
            console.log("not found :: ", found)
            req.params.role = "Client"
            return fetchAllData(req, res)
        }
        else {
            const fetch = [];
            for (let val of found) {
                const res = await workModel.find({ r_id: val.r_id });
                console.log("response::", res)
                if (res.length) {
                    fetch.push({
                        r_id: res.map((val) => val.r_id),
                        work_details: res.map((val) => val.work_details.map((cat) => { return { category: cat.category } })),
                        work_time: res.map((val) => val.work_time),
                        profession_mobile_number: res.map((val) => val.profession_mobile_number),
                        name: val.name,
                        dob: val.dob,
                        avatar: val.avatar,
                        rating: [val.rating],
                        status: res.map((val) => val.status)
                    })
                }
            }
            // console.log(foundHelper)
            console.log("fetch ::", fetch)
            return res.status(200).send(fetch)
        }
    }
}

const sorting = async (req, res) => {

    let field = req.query.field
    // req.params.seachValue
    const order = req.query.sortValue
    // console.log(field, order)
    let num
    if (order === "up") {
        num = -1
    }
    else if (order === "down") {
        num = 1
    }
    const sort = { [field]: num }
    console.log(sort)
    const found = await userModel.find({ r_id: /^H/ }).sort(sort)
    console.log("found::", found)
    // if (found.length === 0) {
    //     console.log("not found :: ", found)
    //     req.params.role = "Client"
    //     return fetchAllData(req, res)
    // }

    // else {
    let fetch = []
    const foundHelper = await Promise.all(
        found.map((val) => {
            return workModel.find({ r_id: val.r_id })
                .then((res) => {
                    console.log(res)
                    fetch.push({
                        r_id: res.map((val) => val.r_id),
                        work_details: res.map((val) => val.work_details.map((cat) => { return { category: cat.category } })),
                        work_time: res.map((val) => val.work_time),
                        profession_mobile_number: res.map((val) => val.profession_mobile_number),
                        name: val.name,
                        dob: val.dob,
                        avatar: val.avatar,
                        rating: [val.rating],
                        status: res.map((val) => val.status),
                    })
                    // console.log(fetch)
                }).catch((error) => {
                    return res.status(400).send(error)
                })
        }
        ))
    // console.log(foundHelper)
    console.log("fetch ::", fetch)
    return res.status(200).send(fetch)
    // }
}
module.exports = {

    fetchAllData,
    saveUserData,
    fetchSaveUser,
    searching,
    sorting,
    fetchAllAvatar,
    profileAvailable
}