const profileModel = require("../model/client/clientProfile")
const regModel = require("../model/tblReg")

const multer = require("multer")

const createProfile = async (req, res) => {
    console.log("profile::");
    try {

        const r_id = req.params.rid
        const isunique = await profileModel.find({ r_id })
        if (isunique.length === 0) {
            throw new Error("Please first upload profile photo !!!")
        }
        const findMbl = await profileModel.findByCredentials(req.body.alt_mob_num, r_id)
        // console.log(findMbl)
        const saveProfile = await profileModel.findOneAndUpdate({ r_id }, { ...req.body }, { new: true })
        if (!saveProfile) {
            throw new Error("Some Problem while saving profile data!")
        }
        console.log(saveProfile)
        res.status(200).send(saveProfile)
    } catch (error) {
        res.status(400).send(error.message)
    }
}
const fetchProfile = async (req, res) => {
    try {
        // console.log("params id ",req.params.rid)
        let isunique = await profileModel.findOne({ r_id: req.params.rid })

        const loginNo = await regModel.findOne({ r_id: isunique.r_id })
        if (isunique.length === 0) {
            throw new Error("This Profile is not available!");
        }
        else {
            isunique = { ...isunique._doc, number: loginNo.mob_num }
            console.log("isunique ::: ", isunique, "login::", loginNo.mob_num)
            return res.status(200).send(isunique)
        }
    } catch (error) {
        res.status(400).send(error.message)
    }


}

//update rating
const updateStar = async (req, res) => {
    try {
        // console.log(req.body.rating)
        const found = await profileModel.findOne({ r_id: req.params.rid });

        if (found) {

            const idIndex = found.rating.findIndex((c) => c.user_id === req.body.user_id);
            // console.log("found old user", idIndex);
            if (idIndex < 0) {
                console.log("found new user");
                const rate = found.rating.concat(req.body)
                const updtStar = await profileModel.findOneAndUpdate(
                    { r_id: req.params.rid },

                    { rating: rate }
                    ,
                    { new: true }
                )
                console.log("new Update ::", updtStar)
                return res.status(200).send()

            }

            else if (found.rating[idIndex].user_id === req.body.user_id) {
                found.rating[idIndex].rate = req.body.rate

                const update = await found.save();
                console.log("old user :: \n", update)
                return res.status(200).send();
            }

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
console.log("update data:: ", update)
        return res.status(200).send("update WorkDetails successfully!")
        // return res.send(isunique)
    } catch (error) {
        res.status(404).send(error.message)
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

const avatarUpload = async (req, res) => {
    try {
        // await req.user.save()
        console.log(req.file)
        const url = req.protocol + '://' + req.get('host')
        console.log("req.file", url + '/image/' + req.file.filename)
        const r_id = req.params.rid
        const foundUser = await regModel.findOne({ r_id })
        if (!foundUser) {
            throw new Error("Please first register youself!")
        }

        // console.log("found :: ", foundUser)
        const found = await profileModel.findOne({ r_id })
        if (found) {
            const updt = await profileModel.findOneAndUpdate({ r_id }, {
                avatar: req.file.path
            }, { new: true })
        }
        else {
            const newpro = new profileModel({
                r_id,
                avatar: req.file.path,
            })

            await newpro.save();
            console.log(newpro);
        }

        res.status(200).send("Profile Photo sucessfully uploaded")
    }
    catch (error) {
        res.status(400).send(error.message)
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
        const found = await profileModel.findOne({ r_id })
        if (!found) {
            throw new Error("Please first upload profile photo !!!")
        }

        const updt = await profileModel.findOneAndUpdate({ r_id }, {
            aadhar_card: req.file.path
        }, { new: true })
        if (!updt) {
            throw new Error("Some Problem while uploading aadharCard!")
        }

        res.status(200).send("Aadhar Card sucessfully uploaded")
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
}