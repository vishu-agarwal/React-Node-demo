const profileModel = require("../model/client/clientProfile")
const regModel = require("../model/tblReg")
const helperModel = require("../model/helpers/helperProfile")

const fetchAllData = async (req, res) => {
    try {

        role = req.params.role
        if (role === "Client") {
            //   fetchHelper = await helperModel.find()
            const fetchHelper = await helperModel.aggregate([
                {
                    $lookup:
                    {
                        from: 'tblC_Profile',
                        localField: 'r_id',
                        foreignField: 'r_id',
                        as: 'abc'
                        // "pipeline": [
                        //     { "$project": { "name": 1 } }
                        // ],
                    },
                },
                {
                    $project: {
                        r_id: 1,
                        workTime: 1,
                        profession_mbl: 1,
                        "workDetails.category": 1,
                        "name": "$abc.name",
                        "dob": "$abc.dob",
                        
                    }
                }

            ])
            if (fetchHelper.length === 0) {
                throw new Error("Data not found !")
            }
            // const name = await profileModel.find({ r_id: fetchHelper.r_id })
            // console.log(name)
            res.status(200).send(fetchHelper)
        }
        else {

        }

    } catch (error) {
        res.status(400).send(error.message)
    }

}

module.exports = {

    fetchAllData,

}