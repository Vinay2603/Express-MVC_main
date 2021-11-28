const express = require("express")



const userController = require("./controllers/users.controllers")
const studentController = require("./controllers/students.controllers")
const evaluationController = require("./controllers/evaluations.controllers")
const markController = require("./controllers/marks.controllers")


const app = express()
app.use(express.json())

app.use("/users",userController)
app.use("/students",studentController)
app.use("/evals",evaluationController)
app.use("/marks",markController)


module.exports = app