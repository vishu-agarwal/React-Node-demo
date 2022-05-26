
const multer = require("multer")
const userModel = require("../model/UserModel")

// update profile details 
const createProfile = async (req, res) => {
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
        return res.status(200).send(profileUpdate)
    } catch (error) {
        return res.status(400).send(error.message)
    }
}

//fetch all profile data
const fetchProfile = async (req, res) => {
    try {
        let fetchProfileDetail = await userModel.find({ r_id: req.params.rid })
        if (fetchProfileDetail.length === 0) {
            return res.status(200).send("Please create profile for move forward!")
        }
        else {
            console.log(fetchProfileDetail)
            return res.status(200).send(fetchProfileDetail)
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
                return res.status(200).send(updtStar)
            }
            else if (findUser.rating[idIndex].user_id === req.params.rid) {
                findUser.rating[idIndex].rate = req.body.rate
                const update = await findUser.save();
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
        const update = await profileModel.findOneAndUpdate({ r_id }, { ...req.body }, { new: true })
        if (!update) {
            throw new Error("Some Problem while uupdating working details!")
        }
        return res.status(200).send(update)
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
//middleware upload profile avatar route
const uploadImg = multer({
    storage: imgConfig,
    // size in bytes
    limits: { fileSize: 512000 }
})
// upload profile avatar
const avatarUpload = async (req, res) => {
    try {
        const url = req.protocol + '://' + req.get('host')
        const r_id = req.params.rid
        const foundUser = await userModel.findOne({ r_id })
        if (!foundUser) {
            throw new Error("Please first Login youself!")
        }
        const avatarUpdate = await userModel.findOneAndUpdate({ r_id }, {
            avatar: req.file.path
        }, { new: true })
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
// midleware from router of aadhar
const uploadPdf = multer({
    storage: pdfConfig,
    fileFilter: isPdf,
})
// aadhar card upload function 
const aadharUpload = async (req, res) => {
    try {
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
        return res.status(200).send(aadharUpdate)
    }
    catch (error) {
        return res.status(400).send(error.message)
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
    
}