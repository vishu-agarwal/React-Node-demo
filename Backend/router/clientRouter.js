const express = require("express")
const router = new express.Router()
const auth = require("../middleware/authMidleware")


//controller
const profileController = require("../controller/profileController")

//createProfile
router.post("/myhelpers/crtProfile/:rid",auth, profileController.createProfile)
//upload avatar 

router.post("/myhelper/upldAvatar/:rid", auth,
    // note--------------   avatar is name of react field where file is upload
    profileController.uploadImg.single('avatar'),//   midleware for upload file
    profileController.avatarUpload
   
)
router.post("/myhelper/upldAadhar/:rid", auth,
    // note--------------   avatar is name of react field where file is upload
    profileController.uploadPdf.single('aadharCard'),//   midleware for upload file
    profileController.aadharUpload
    
)

//fecth email
// router.get("/myhelpers/userProfile/fetchEmail/:rid", auth, profileController.fetchEmail)

// //fetch avatar
// router.get("/myhelpers/userProfile/fetchAvatar/:rid", auth, profileController.fetchAvatar)

//fecth profile
router.get("/myhelpers/userProfile/fetch/:rid",auth, profileController.fetchProfile)

//update star
router.put("/myhelper/updateStar/:rid", auth, profileController.updateStar)

//update profile
router.put("/myhelpers/client/update/:rid", auth, profileController.updateProfile)

//delete profile
router.delete("/myhelpers/client/delete/:rid", auth, async (req, res) => {

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