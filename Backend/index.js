require("dotenv").config()
const express = require("express")

require("./mongooseCon")
//const route = require("./routers")

const app = express()
app.use(express.json())

app.use('/image',express.static('image'))
app.use('/pdfFile', express.static('pdfFile'))
const regRoute = require("./router/regRouter")
app.use(regRoute)
const cProfileRoute = require("./router/clientRouter")
app.use(cProfileRoute)
const WorkProfileRoute = require("./router/helperRouter")
app.use(WorkProfileRoute)
const DisplayRoute = require("./router/displayRouter")
app.use(DisplayRoute)
// const saveRoute = require("./router/saveRouter")
// app.use(saveRoute)
const HireRoute = require("./router/hireRequestRouter")
app.use(HireRoute)
const port = process.env.PORT

app.listen(port, () => {
    console.log("server port :: " + port);
})
