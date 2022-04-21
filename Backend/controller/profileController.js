const profileModel = require("../model/client/clientProfile")

const multer = require("multer")

const createProfile = async (req, res) => {
    console.log("profile::");
    try {

        const isunique = await profileModel.find({ r_id: req.params.rid })
        if (isunique.length !== 0) {
            throw new Error("this proflile already available !!!")
        }
        const findMbl = await profileModel.findByCredentials(req.body.alt_mob_num, req.params.rid)
        // console.log(findMbl)
        const r_id = req.params.rid
        const newpro = new profileModel({
            r_id,
            ...req.body,
        })
        console.log(newpro);
        await newpro.save();
        res.status(200).send(newpro)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

//set destination and fie name
const imgConfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null,'image/')
    },
    filename: (req, file, callback) => {
        const ext = file.mimetype.split('/')[1]
        callback(null,`image-${Date.now()}.${ext}`)
    },
})
//check file is image or not
const isImage = (req,file,callback) => {
    if (file.mimetype.startsWith('image')) {
            callback(null, true)
    }
    else
    {
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
        console.log("req.file", req.file)
        // await req.user.save()
        const r_id = req.params.rid
        const newpro = new profileModel({
            r_id: r_id,
            avatar: req.file.filename,
        })

        await newpro.save();
        console.log(newpro);
    
        res.status(200).send("sucessfully uploaded")
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

    console.log("req.file", req.file)
    // await req.user.save()
    const r_id = req.params.rid
    const newpro = new profileModel({
        r_id: r_id,
        aadhar_card: req.file.filename,
    })

    // await newpro.save();
    console.log(newpro);

    res.status(200).send("sucessfully uploaded")
}
module.exports = {
    createProfile,
    avatarUpload,
    uploadImg,
    aadharUpload,
    uploadPdf,
}