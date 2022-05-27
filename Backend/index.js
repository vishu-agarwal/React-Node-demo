require("dotenv").config()
const express = require("express")
require("./mongooseConnection")
// const cors = require("cors")

const app = express()
app.use(express.json())
// app.use(cors())

//store files image and pdf
app.use('/image', express.static('image'))
app.use('/pdfFile', express.static('pdfFile'))

const loginRoute = require("./router/loginRouter")
app.use(loginRoute)

const profileRoute = require("./router/profileRouter")
app.use(profileRoute)

const WorkProfileRoute = require("./router/workDetailRouter")
app.use(WorkProfileRoute)

const DisplayRoute = require("./router/displayRouter")
app.use(DisplayRoute)

const HireRoute = require("./router/hireRequestRouter")
app.use(HireRoute)

const port = process.env.PORT

app.listen(port, () => {
    console.log("server port :: " + port);
})
