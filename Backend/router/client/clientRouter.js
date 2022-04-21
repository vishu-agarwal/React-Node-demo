const express = require("express")
const router = new express.Router()

//controller
const profileController = require("../../controller/profileController")

//createProfile
router.post("/myhelpers/crtProfile/:rid", profileController.createProfile)
//upload avatar 

router.post("/myhelper/upldAvatar/:r_id",
// note--------------   avatar is name of react field where file is upload
    profileController.uploadImg.single('avatar'),//   midleware for upload file
    profileController.avatarUpload,
    // (error, req, res, next) => {
    // res.status(400).send(error.message)
    // }
)
router.post("/myhelper/upldAadhar/:r_id",
    // note--------------   avatar is name of react field where file is upload
    profileController.uploadPdf.single('aadharCard'),//   midleware for upload file
    profileController.aadharUpload,
    // (error, req, res, next) => {
    // res.status(400).send(error.message)
    // }
)


//fecth profile
router.get("/myhelpers/client/fetch/:rid", async (req, res) => {

    try {

        const isunique = await profileModel.find({ r_id: req.params.rid })
        if (isunique.length === 0) {
            return res.status(201).send("this proflile not available !!!");
        }
        else {
            return res.status(201).send(isunique)
        }
    } catch (error) {
        res.status(404).send(error.message)
    }

})




//update profile
router.put("/myhelpers/client/update/:rid", async (req, res) => {
    //which field are allowed to update
    try {

        const isunique = await profileModel.findOne({ r_id: req.params.rid })
        if (isunique.length === 0) {
            return res.status(201).send("this proflile not available !!!");
        }
        const update = Object.keys(req.body)
        const allowed = ['name', 'address', 'about', 'alt_mob_num']
        const isvalid = update.every((updt) => {
            return ab = allowed.includes(updt)
        })
        if (!isvalid) {
            return res.status(400).send("invalid updates!!");
        }
        update.forEach((updt) => isunique[updt] = req.body[updt])
        await isunique.save()
        return res.send(isunique)
    } catch (error) {
        res.status(404).send(error.message)
    }
})

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