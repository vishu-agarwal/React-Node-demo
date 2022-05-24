const profileModel = require("../model/clientProfile")
const regModel = require("../model/tblReg")
const avatarModel = require("../model/tblProfileAvatar")
const multer = require("multer")
const userModel = require("../model/UserModel")

const fetchEmail = async (req, res) => {
    try {
        const fetchUser = await regModel.findOne({ r_id: req.params.rid })
        return res.status(200).send(fetchUser.email)
    }
    catch (error) {
        console.log("email::", error.message)
        return res.status(400).send(error.message)
    }
}
// const createProfile = async (req, res) => {
//     console.log("profile::");
//     try {

//         const r_id = req.params.rid
//         const isunique = await avatarModel.find({ r_id })
//         if (isunique.length === 0) {
//             throw new Error("Please first upload profile photo !")
//         }
//         // const findMbl = await profileModel.findByCredentials(req.body.alt_mob_num, r_id)
//         // console.log(findMbl)
//         const profileDetail = { r_id, ...req.body }
//         // console.log("final user :: ",user);
//         const saveProfile = new profileModel(profileDetail)
//         console.log(saveProfile);
//         if (!saveProfile) {
//             throw new Error("Some problem while saving profile data!")
//         }
//         await saveProfile.save()
//         return res.status(200).send("Profile successfully  saved!")
//         // const saveProfile = await profileModel.findOneAndUpdate({ r_id }, { ...req.body }, { new: true })

//         // console.log(saveProfile)
//         // res.status(200).send(saveProfile)
//     } catch (error) {
//         return res.status(400).send(error.message)
//     }
// }
const createProfile = async (req, res) => {
    console.log("profile::");
    try {

        const r_id = req.params.rid
        const foundUser = await userModel.findOne({ r_id })
        if (!foundUser) {
            throw new Error("Please first Login youself!")
        }
        const profileUpdate = await userModel.findOneAndUpdate(
            { r_id },
            { ...req.body },
            { new: true }
        )
        console.log(profileUpdate)
        return res.status(200).send(profileUpdate)
    } catch (error) {
        return res.status(400).send(error.message)
    }
}
const fetchAvatar = async (req, res) => {
    try {
        // console.log("params id ", req.params.rid)
        // if (avatarModel) {
        let found = await userModel.find({ r_id: req.params.rid })
        console.log(found.r_id, "find")
        if (found.length === 0) {
            return res.status(200).send("First upload photo for create profile!")
        }
        return res.status(200).send(found)
        // }
    } catch (error) {
        console.log("avatar::", error.message)
        return res.status(400).send(error.message)
    }
}

const fetchProfile = async (req, res) => {
    try {
        console.log("params id ", req.params.rid)

        let fetchProfileDetail = await userModel.find({ r_id: req.params.rid })
        console.log(fetchProfileDetail, "find")
        if (fetchProfileDetail.length === 0) {
            return res.status(200).send("Please create profile for move forward!")
        }
        else {

            return res.status(200).send(fetchProfileDetail)
        }

    } catch (error) {
        console.log("profile::", error.message)
        return res.status(400).send(error.message)
    }
}

//update rating
const updateStar = async (req, res) => {
    try {
        console.log(req.body.rate)
        const found = await userModel.findOne({ r_id: req.params.rid });
        if (found)
        {
            const findUser = await userModel.findOne({ r_id: req.body.user_id })
            console.log("finduser:::", findUser)
            const idIndex = findUser.rating.findIndex((c) => c.user_id === req.params.rid);
            // const idIndex = found.rating.findIndex((c) => c.user_id === req.body.user_id);
            console.log("found old user", idIndex);
            if (idIndex < 0) {
                console.log("found new user");
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
                console.log("new Update ::", updtStar)
                return res.status(200).send(updtStar)
            }
            else if (findUser.rating[idIndex].user_id === req.params.rid) {
                findUser.rating[idIndex].rate = req.body.rate
                const update = await findUser.save();
                console.log("old user :: \n", update)
                return res.status(200).send(update);
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
//update user profile
const updateProfile = async (req, res) => {
    //which field are allowed to update
    try {
        const r_id = req.params.rid
        // const found = await profileModel.findOne({ r_id })

        const update = await profileModel.findOneAndUpdate({ r_id }, { ...req.body }, { new: true })
        if (!update) {
            throw new Error("Some Problem while uupdating working details!")
        }
        // console.log("update data:: ", update)
        return res.status(200).send("Update profile successfully!")
        // return res.send(isunique)
    } catch (error) {
        return res.status(404).send(error.message)
    }
}

//set destination and fie name
const imgConfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'image/')
    },
    filename: (req, file, callback) => {
        const ext = file.mimetype.split('/')[1]
        callback(null, `image-${Date.now()}.${ext}`)
    },
})
//check file is image or not
const isImage = (req, file, callback) => {
    if (file.mimetype.startsWith('image')) {
        callback(null, true)
    }
    else {
        callback(new Error("Please select only image file !"))
    }
}
const uploadImg = multer({
    // fileFilter: isImage,
    storage: imgConfig,
    // size in bytes
    limits: { fileSize: 512000 }
    // dest:'image/'
})

// const avatarUpload = async (req, res) => {
//     try {
//         // await req.user.save()
//         console.log(req)
//         const url = req.protocol + '://' + req.get('host')
//         console.log("req.file", url + '/image/' + req.file.filename)
//         const r_id = req.params.rid
//         const foundUser = await regModel.findOne({ r_id })
//         if (!foundUser) {
//             throw new Error("Please first register youself!")
//         }

//         // console.log("found :: ", foundUser)
//         const found = await avatarModel.findOne({ r_id })
//         if (found) {
//             const updt = await avatarModel.findOneAndUpdate({ r_id }, {
//                 avatar: req.file.path
//             }, { new: true })
//         }
//         else {
//             const newpro = new avatarModel({
//                 r_id,
//                 avatar: req.file.path,
//             })

//             await newpro.save();
//             // console.log(newpro);
//         }

//         return res.status(200).send("Profile pic sucessfully uploaded ! ")
//     }
//     catch (error) {
//         return res.status(400).send(error.message)
//     }
// }
const avatarUpload = async (req, res) => {
    try {
        // await req.user.save()
        console.log(req)
        const url = req.protocol + '://' + req.get('host')
        console.log("req.file", url + '/image/' + req.file.filename)
        const r_id = req.params.rid
        const foundUser = await userModel.findOne({ r_id })
        if (!foundUser) {
            throw new Error("Please first Login youself!")
        }
        const avatarUpdate = await userModel.findOneAndUpdate({ r_id }, {
            avatar: req.file.path
        }, { new: true })
        console.log(avatarUpdate)
        return res.status(200).send(avatarUpdate)
    }
    catch (error) {
        return res.status(400).send(error.message)
    }
}
//set destination and fie name
const pdfConfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'pdfFile/')
    },
    filename: (req, file, callback) => {
        const ext = file.mimetype.split('/')[1]
        callback(null, `aadhar-${Date.now()}.${ext}`)
    },
})
//check file is pdf or not
const isPdf = (req, file, callback) => {
    if (file.mimetype.startsWith('application/pdf')) {

        callback(null, true)
    }
    else {
        callback(new Error("Please select only PDF file !"))
    }
}
const uploadPdf = multer({
    storage: pdfConfig,
    fileFilter: isPdf,
    // dest:'image/'
})

const aadharUpload = async (req, res) => {
    try {
        console.log("req.file", req.file)
        // await req.user.save()
        // console.log(req.params.rid)
        const r_id = req.params.rid
        const found = await userModel.findOne({ r_id })
        if (!found) {
            throw new Error("Please first upload profile photo !")
        }
        const aadharUpdate = await userModel.findOneAndUpdate({ r_id }, {
            aadhar_card: req.file.path
        }, { new: true })
        if (!aadharUpdate) {
            throw new Error("Some Problem while uploading aadharCard!")
        }
        res.status(200).send(aadharUpdate)
    }
    catch (error) {
        res.status(400).send(error.message)
    }
}
module.exports = {
    createProfile,
    fetchProfile,
    avatarUpload,
    uploadImg,
    aadharUpload,
    uploadPdf,
    updateStar,
    updateProfile,
    fetchEmail,
    fetchAvatar
}