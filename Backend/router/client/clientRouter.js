const express = require("express")
const router = new express.Router()

//model File
const profileModel = require("../../model/client/clientProfile")

router.post("/myhelpers/user/profile/:rid", async (req, res) => {
    console.log("profile::");
    try {
        console.log("try block");
        const isunique = await profileModel.find({ r_id: req.params.rid })
        if (isunique.length !== 0) {
            throw new Error("this proflile already available !!!")
        }
        await profileModel.findByCredentials(req.body.alt_mob_num, req.params.rid)
        const r_id = req.params.rid
        const newpro = new profileModel({
            r_id,  
            ...req.body,
        })
            await newpro.save();
            //console.log(newUser);
            res.status(200).send(newpro)
    } catch (error) {
        res.status(400).send(error.message)
        
    }

})

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
    const allowed = ['name', 'address', 'about','alt_mob_num']
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