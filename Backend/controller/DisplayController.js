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
                },
                

            ])
            if (fetchHelper.length === 0) {
                throw new Error("Data not found !")
            }
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
        // console.log("save user")

        const found = await saveModel.findOne({ r_id: req.params.rid })
        console.log(req.body.length !== 0)
        if (found) {
            // if (req.body === null) { res.status(200).send() }

            const userFound = await saveModel.find({ r_id: found.r_id, "saveUser.user_id": req.body.user_id })
            console.log("user Found",userFound)
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
    field === "Location" ? field = "address.pincode" : field === "Name" ? field = "name" : field === "Work Category" ? field2 = "workDetails.category" : field === "Work Timing" ? field2 = "workTime" : ""
    if (field2) {
        console.log("field2::", field2)
        const found = await helperModel.find({ [field2]: req.query.searchValue })
        console.log(found)
        if (found.length === 0) {
            console.log(found)
            req.params.role = "Client"
          return  fetchAllData(req, res)
        }
        else {
            let fetch = []
            const foundHelper = await Promise.all(
                found.map((val) => {
                    return profileModel.find({ r_id: val.r_id }).then((res) => {
                        fetch.push({
                            r_id: val.r_id,
                            workDetails:[ val.workDetails.map((cat) => { return { category: cat.category } })],
                            workTime: val.workTime,
                            profession_mbl: val.profession_mbl,
                            name: res.map((val) => val.name),
                            dob: res.map((val) => val.dob),
                            avatar: res.map((val) => val.avatar),
                            rating: res.map((val) => val.rating)
                        })
                    }).catch((error) => {
                        return res.status(400).send(error.massage)
                    })
                }
                ))
            // console.log("fetch ::", fetch)
            return res.status(200).send(fetch)
        }
    }
    else if (field) {
        // console.log("field::", req.params.searchValue)
        const found = await profileModel.find({ [field]: req.query.searchValue })
        console.log("found::",found)
        if (found.length === 0) {
            console.log("not found :: ", found)
            req.params.role = "Client"
           return fetchAllData(req, res)
        }

        else {
            let fetch = []
            const foundHelper = await Promise.all(
                found.map((val) => {
                    return helperModel.find({ r_id: val.r_id })
                        .then((res) => {
                            console.log(res)
                        fetch.push({
                            r_id: res.map((val)=>val.r_id),
                            workDetails: res.map((val)=>val.workDetails.map((cat) => { return { category: cat.category } })),
                            workTime: res.map((val)=>val.workTime),
                            profession_mbl: res.map((val)=>val.profession_mbl),
                            name: val.name,
                            dob: val.dob,
                            avatar: val.avatar,
                            rating:[val.rating]
                        })
                            // console.log(fetch)
                    }).catch((error) => {
                        return res.status(400).send(error)
                    })
                }
                ))
            // console.log(foundHelper)
            // console.log("fetch ::", fetch)
            return res.status(200).send(fetch)
        }
    }
}

module.exports = {

    fetchAllData,
    saveUserData,
    fetchSaveUser,    
    searching
}