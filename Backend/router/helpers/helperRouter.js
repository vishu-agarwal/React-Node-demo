const express = require("express")
const router = new express.Router()


const workProfileController = require("../../controller/workProfileController")
//model File
const profileModel = require("../../model/client/clientProfile")

router.post("/myhelpers/createWorkProfile/:rid", workProfileController.createWorkProfile)

//fecth profile
router.get("/myhelpers/fetchWorkDetail/:rid", workProfileController.fetchWorkDetails)







router.get('/', async(req, res) => {
    const isunique = await profileModel.find({ r_id: 'H107' })
    console.log(isunique)
    res.json({data:isunique[0].avatar})
});
//update profile
router.put("/myhelpers/helper/update/:rid", async (req, res) => {
    //which field are allowed to update
    try {

        const isunique = await profileModel.findOne({ r_id: req.params.rid })
        if (isunique.length === 0) {
            return res.status(201).send("this proflile not available !!!");
        }
        const update = Object.keys(req.body)
        const allowed = ['name', 'address', 'about', 'alt_mob_num', 'languages', 'education', 'skills']
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