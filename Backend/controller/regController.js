const regModel = require("../model/tblReg")


const loginController = async (req, res) => {
    // console.log(req.params.role)
    const role = req.params.role.charAt(0)
    let newUser 
    console.log(req.body.email)
    try {
        const found = await regModel.find({ email: req.body.email });
         console.log("loginfound::",found)
        if (found.length !== 0) {
            const fnd_role = found[0].r_id.charAt(0)
            if (role === fnd_role) {
                newUser = new regModel(...found)
                // console.log(newUser)
                // const token = await found.generateAuthToken()
                // return res.status(200).send({ found, token })
            }
            else {
                //return res.status(400).send()
                throw new Error("You are unauthorized for this role")
            }
        }
        else {

            const id = await regModel.findOne().sort({ createdAt: -1 })
            // console.log("id ::",id)
            let rid
            if (id) {
                rid = id.r_id.slice(1)
                // console.log("rid from id", rid);
            }
            else {
                rid = 100
                // console.log("rid inital ::",rid);
            }
            // console.log(role)
            // const assignrole = await regModel.assignRole(req.params.role)
            const r_id = role + ++rid
            // console.log(r_id);
            const user = { r_id, ...req.body }
            // console.log("final user :: ",user);
            newUser = new regModel(user)
            // console.log(newUser);
            await newUser.save()
            // return res.status(200).send(newUser);
            
        }
        const token = await newUser.generateAuthToken()
        return res.status(200).send({ newUser, token })
    }
    catch (error) {
        // console.log(error.message)
        res.status(400).send(error.message)
    }

}

module.exports = {
    loginController
}