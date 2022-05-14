const express = require("express")
const router = new express.Router()

//controller
const profileController = require("../../controller/profileController")

//createProfile
router.post("/myhelpers/crtProfile/:rid", profileController.createProfile)
//upload avatar 

router.post("/myhelper/upldAvatar/:rid",
    // note--------------   avatar is name of react field where file is upload
    profileController.uploadImg.single('avatar'),//   midleware for upload file
    profileController.avatarUpload,
    // (error, req, res, next) => {
    // res.status(400).send(error.message)
    // }
)
router.post("/myhelper/upldAadhar/:rid",
    // note--------------   avatar is name of react field where file is upload
    profileController.uploadPdf.single('aadharCard'),//   midleware for upload file
    profileController.aadharUpload,
    // (error, req, res, next) => {
    // res.status(400).send(error.message)
    // }
)


//fecth profile
router.get("/myhelpers/userProfile/fetch/:rid", profileController.fetchProfile)

//update star
router.put("/myhelper/updateStar/:rid", profileController.updateStar)


//update profile
router.put("/myhelpers/client/update/:rid", profileController.updateProfile)

//delete profile
router.delete("/myhelpers/client/delete/:rid", async (req, res) => {

    try {
        const isavail = await profileModel.findOne({ r_id: req.params.rid })
        if (!isavail) {
            return res.status(201).send("this proflile not available !!!");
        }
        else {
            const del = await isavail.remove()
            return res.status(201).send(del)
        }
    } catch (error) {
        res.status(404).send(error.message)
    }

})

module.exports = router