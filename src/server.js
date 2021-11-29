const app = require("./app")

const connect = require("./configs/db")



app.listen(2345,async(req,res)=>{
    await connect()
    console.log("listing to port 2345")
})