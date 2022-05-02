const profileModel = require("../model/client/clientProfile")
const regModel = require("../model/tblReg")
const helperModel = require("../model/helpers/helperProfile")

const fetchAllData = async (req, res) => {
    try {

        role = req.params.role
        if (role === "Client") {
            //   fetchHelper = await helperModel.find()

            // const abc = await profileModel.find()

            // const totIds = abc.map((item) => {
            //     if (item.r_id.charAt(0) === "H"){
            //         return item.rating.map((id) =>
            //             id.user_id
            //         ).length
            //     }
            // }
            // );

            // const totRates = abc.map((item) =>
            //     item.rating.map((id) =>
            //         id.rate
            //     ).reduce((prev, curr) => prev + curr, 0)
            // );
            // const result = totRates.map(function (n, i) { return n / totIds[i]; })
            // console.log(totIds, totRates, result)
            // const rates = result.map((item) => {
            //     return isNaN(item) ? item = 0 : item

            // })
            // // console.log(rate)

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
                        "rating": "$abc.rating"
                    }
                }

            ])
            if (fetchHelper.length === 0) {
                throw new Error("Data not found !")
            }
            // console.log(fetchHelper)
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