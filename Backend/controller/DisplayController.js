const userModel = require("../model/UserModel")
const workModel = require("../model/WorkDetailsModel")

//fetch all user data
const fetchAllData = async (req, res) => {
    try {
        role = req.params.role
        if (role === "Client") {
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
            return res.status(200).send(fetchHelper)
        }
    } catch (error) {
        return res.status(400).send(error.message)
    }
}

//update rating
const updateStar = async (req, res) => {
    try {
        const found = await userModel.findOne({ r_id: req.params.rid });
        if (found) {
            const findUser = await userModel.findOne({ r_id: req.body.user_id })
            const idIndex = findUser.rating.findIndex((c) => c.user_id === req.params.rid);
            if (idIndex < 0) {
                const updateRate = {
                    user_id: req.params.rid,
                    rate: req.body.rate
                }
                const rate = findUser.rating.concat(updateRate)
                const updtStar = await userModel.findOneAndUpdate(
                    { r_id: req.body.user_id },
                    { rating: rate },
                    { new: true }
                )                
                return res.status(200).send([updtStar])
            }
            else if (findUser.rating[idIndex].user_id === req.params.rid) {
                findUser.rating[idIndex].rate = req.body.rate
                const update = await findUser.save();
                return res.status(200).send([update]);
            }
        }
        else {
            throw new Error("Please first create your profile!")
        }
    }
    catch (error) {
        return res.status(400).send(error.message)
    }
}
//save user data 
const saveUserData = async (req, res) => {
    try {
        const user = await userModel.findOne({ r_id: req.params.rid })
        if (!user.is_profile) {
            throw new Error("Please first create your profile!")
        }
        const saveIdFound = await userModel.find({ r_id: user.r_id, "saved_user.user_id": req.body.user_id })
        if (saveIdFound.length !== 0) {
            const removeSave = await userModel.findOneAndUpdate({ r_id: user.r_id, "saved_user.user_id": req.body.user_id },
                { $pull: { saved_user: { user_id: req.body.user_id } } }, { new: true })
            return res.status(200).send(removeSave.saved_user)
        }
        const saveNewUser = user.saved_user.concat(req.body)
        const addSave = await userModel.findOneAndUpdate({ r_id: req.params.rid },
            { saved_user: saveNewUser }, { new: true })
        return res.status(200).send(addSave.saved_user)
    }
    catch (error) {
        return res.status(400).send(error.message)
    }
}
// fetch saved user
const fetchSaveUser = async (req, res) => {
    try {
        const found = await userModel.find({ r_id: req.params.rid })
        return res.status(200).send(found.map((val) => val.saved_user).flat())
    }
    catch (error) {
        return res.status(400).send(error.message)
    }
}
//search 
const searching = async (req, res) => {
    let field = req.query.field

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
        const found = await workModel.find({ [field2]: req.query.searchValue })
        if (found.length === 0) {
            req.params.role = "Client"
            return fetchAllData(req, res)
        }
        else {
            let fetch = []
            for (let val of found) {
                const res = await userModel.find({ r_id: val.r_id });
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
            return res.status(200).send(fetch)
        }
    }
    else if (field) {
        let found
        field === "gender" ? found = await userModel.find({ [field]: req.query.searchValue })
            :
            found = await userModel.find({ $where: `/^${req.query.searchValue}.*/.test(this.${field})` })
        if (found.length === 0) {
            req.params.role = "Client"
            return fetchAllData(req, res)
        }
        else {
            const fetch = [];
            for (let val of found) {
                const res = await workModel.find({ r_id: val.r_id });
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
            return res.status(200).send(fetch)
        }
    }
}
// sort age
const sorting = async (req, res) => {
    let field = req.query.field
    const order = req.query.sortValue
    let num
    if (order === "up") {
        num = -1
    }
    else if (order === "down") {
        num = 1
    }
    const sort = { [field]: num }
    const found = await userModel.find({ r_id: /^H/ }).sort(sort)
    let fetch = []
    for (let val of found) {
        const res = await workModel.find({ r_id: val.r_id });
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
                status: res.map((val) => val.status),
            })
        }
    }
    return res.status(200).send(fetch)
}

module.exports = {
    updateStar,
    fetchAllData,
    saveUserData,
    fetchSaveUser,
    searching,
    sorting,
}