const express = require("express")
const router = new express.Router()
//let count = 100
//model File
const regModel = require("../model/tblReg")

//home
router.get("/myhelpers", async (req, res) => {
    console.log("home");
    return res.json({ data: "Welcome user at my helpers" })
})
//register user
router.post("/myhelpers/register/:role", async (req, res) => {
    console.log(req.params.role)
    const role = req.params.role.charAt(0)
    try {
        const found = await regModel.findOneAndUpdate({ mob_num: req.body.mob_num }, req.body.password, { new: true });
        //console.log(found)
        if (found) {
            const fnd_role = found.r_id.charAt(0)
            if (role === fnd_role)
            {
                return res.status(200).send(found)
                
            }
            else
            {
                return res.status(200).send("your role is wrong ")
                }
            //const updatepro = await ProductModel.findOneAndUpdate({ password: req.body.password }, updt, { new: true })
        }
        else {

            const id = await regModel.findOne().sort({ createdAt: -1 })
            //console.log("id ::",id)
            let rid
            if (id) {
                rid = id.r_id.slice(1)
                //   console.log("rid from id",rid);
            }
            else {
                rid = 100
                // console.log("rid inital ::",rid);
            }

            const role = await regModel.assignRole(role)
            const r_id = role + ++rid
            //console.log(r_id);
            const user = { r_id, ...req.body }
            //console.log("final user :: ",user);
            const newUser = new regModel(user)

            console.log(newUser);
            await newUser.save()
            return res.status(200).send(newUser);
        }
    } catch (error) {
        res.status(400).send(error)
    }

})
//fetch users
router.get("/myhelpers/fetchuser", async (req, res) => {
    const list = await regModel.find()
    console.log(list);
    res.send(list)
})

// login user information
router.get("/myhelpers/profile", async (req, res) => {

    const list = await req.user
    //console.log(list);
    res.send(list)
})

//Login user
router.post("/myhelpers/login", async (req, res) => {

    try {
        const user = await regModel.findByCredentials(req.body.uname, req.body.password)
        //   console.log("user :::: "+user);
        //token
        const isToken = await regModel.findOne({ tokens: user.tokens[0] })
        // console.log("login token ::: "+isToken);
        if (isToken) {
            return res.status(200).send("you already logged in !!")
        }
        const token = await user.generateAuthToken()//user created method
        return res.status(200).send({ user, token })
    } catch (e) {
        res.status(400).send(e.message)
    }
})

//logout

router.delete("/user/logout", async (req, res) => {
    console.log("logout call :: ");
    try {
        // req.user.tokens = req.user.tokens.filter((token) => {
        //     return token.token !== req.tok
        // })

        const isToken = await regModel.findOneAndUpdate({ _id: req.user._id }, { tokens: [] }, { new: true })
        // this is use to delete all tokens
        //if not write current token is only deleted
        //   req.user.tokens = []
        //await req.user.save()
        res.status(200).send("success fully logout!!")
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router