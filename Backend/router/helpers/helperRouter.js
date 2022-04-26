const express = require("express")
const router = new express.Router()

//model File
const profileModel = require("../../model/client/clientProfile")
//controllers
const workProfileController = require("../../controller/workProfileController")

//create profile 
router.post("/myhelpers/createWorkProfile/:rid", workProfileController.createWorkProfile)

//fecth profile
router.get("/myhelpers/fetchWorkDetail/:rid", workProfileController.fetchWorkDetails)


// router.get('/', async(req, res) => {
//     const isunique = await profileModel.find({ r_id: 'H107' })
//     console.log(isunique)
//     res.json({data:isunique[0].avatar})
// });

//update profile
router.put("/myhelpers/updateWorkDetail/:rid", workProfileController.updateWorkDetails)

//delete profile
router.delete("/myhelpers/helper/delete/:rid", async (req, res) => {

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