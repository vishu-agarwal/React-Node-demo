require("dotenv").config()
const express = require("express")

require("./mongooseCon")
//const route = require("./routers")

const app = express()
app.use(express.json())

app.use(express.static('image'))

const regRoute = require("./router/regRouter")
app.use(regRoute)
const cProfileRoute = require("./router/client/clientRouter")
app.use(cProfileRoute)

const port = process.env.PORT

app.listen(port, () => {
    console.log("server port :: " + port);
})
