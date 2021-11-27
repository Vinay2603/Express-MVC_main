const express = require("express")
const mongoose = require("mongoose")

const connect = ()=>{
  return  mongoose.connect("mongodb+srv://vinay123:vinay123@cluster0.jchco.mongodb.net/test")
}

//*****************************  user Schema ***************** */
const userSchema = new mongoose.Schema({
     first_name :{type: String , required: true },
     last_name :{type: String , required:true },
     gender :{type: String , required : true },
     date_of_birth :{type:String , required: true }


},{
    versionKey: false,
    timestamps: true 
})

const User = mongoose.model("user", userSchema)

//*****************************  user Schema ***************** */

//***************************** student Schema **************** */
const studentSchema = new mongoose.Schema({
    roll_id :{type: Number , required: true },
    current_batch :{type: String , required:true },
   
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true ,
    }

},{
   versionKey: false,
   timestamps: true 
})

const Student = mongoose.model("student", studentSchema)

//***************************** student Schema **************** */

//***************************** evaluation Schema **************** */
const evalSchema = new mongoose.Schema({
    date_of_evaluation :{type: String , required: true },
    instructor :{type: String , required:true },
    topic_name :{type: String , required: true },
    student_id:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"student",
        required:true ,
    }]

},{
   versionKey: false,
   timestamps: true 
})

const Eval = mongoose.model("eval", evalSchema)


//***************************** evaluation Schema **************** */
const app = express()
app.use(express.json())

//************************ users CRUD ********************** */
app.post("/users", async(req,res)=>{
   try{
       const user =await  User.create(req.body)
       return res.status(200).send(user)    


   }catch(e){
       return res.status(500).json({message : e.message , status : "failed" })
   }
})

app.get("/users", async (req,res)=>{
    try{
        const user = await User.find().lean().exec()
        return res.status(201).send({user})
    }catch(e){
        return res.status(500).send({message :e.message , status:"failed"})
    }
})

app.get("/users/:id", async (req,res)=>{
    try{
        const user = await User.findById(req.params.id).lean().exec()
        return res.status(201).send({user})
    }catch(e){
        return res.status(500).send({message :e.message , status:"failed"})
    }
})

app.patch("/user/:id", async(req,res)=>{
    try{
        const user = User.findByIdAndUpdate(req.params.id , req.body,{new:true}).lean().exec()
        return res.status(201).send(user)
    }catch(e){
        return res.status(500).send({message :e.message , status:"failed"})
    }
})

app.delete("/user/:id", async(req,res)=>{
try{
    const user = await User.findByIdAndDelete(req.params.id).lean().exec()
    return res.status(201).send({user})
}catch(e){
        return res.status(500).send({message :e.message , status:"failed"})
    }

})
/// ******************** user CRUD ******************///

//*******************student CRUD ******************** */
app.post("/students", async(req,res)=>{
    try{
        const student =await  Student.create(req.body)
        return res.status(200).send(student)    
 
 
    }catch(e){
        return res.status(500).json({message : e.message , status : "failed" })
    }
 })
 
 app.get("/students", async (req,res)=>{
     try{
         const student = await Student.find().populate("user_id").lean().exec()
         return res.status(201).send({student})
     }catch(e){
         return res.status(500).send({message :e.message , status:"failed"})
     }
 })
 
 app.get("/students/:id", async (req,res)=>{
     try{
         const student = await Student.findById(req.params.id).lean().exec()
         return res.status(201).send({student})
     }catch(e){
         return res.status(500).send({message :e.message , status:"failed"})
     }
 })
 
 app.patch("/students/:id", async(req,res)=>{
     try{
         const student =await Student.findByIdAndUpdate(req.params.id , req.body,{new:true}).lean().exec()
         return res.status(201).send(student)
     }catch(e){
         return res.status(500).send({message :e.message , status:"failed"})
     }
 })
 
 app.delete("/students/:id", async(req,res)=>{
 try{
     const student = await Student.findByIdAndDelete(req.params.id).lean().exec()
     return res.status(201).send({student})
 }catch(e){
         return res.status(500).send({message :e.message , status:"failed"})
     }
 
 })

//*******************student CRUD ******************** */

//*******************evaluation CRUD ******************** */
app.post("/evals", async(req,res)=>{
    try{
        const eval =await  Eval.create(req.body)
        return res.status(200).send(eval)    
 
 
    }catch(e){
        return res.status(500).json({message : e.message , status : "failed" })
    }
 })
 
 app.get("/evals", async (req,res)=>{
     try{
         const eval = await Eval.find().populate("student_id").lean().exec()
         return res.status(201).send({eval})
     }catch(e){
         return res.status(500).send({message :e.message , status:"failed"})
     }
 })
 
 app.get("/evals/:id", async (req,res)=>{
     try{
         const eval = await Eval.findById(req.params.id).lean().exec()
         return res.status(201).send({eval})
     }catch(e){
         return res.status(500).send({message :e.message , status:"failed"})
     }
 })
 
 app.patch("/evals/:id", async(req,res)=>{
     try{
         const eval =await Eval.findByIdAndUpdate(req.params.id , req.body,{new:true}).lean().exec()
         return res.status(201).send(eval)
     }catch(e){
         return res.status(500).send({message :e.message , status:"failed"})
     }
 })
 
 app.delete("/evals/:id", async(req,res)=>{
 try{
     const eval = await Eval.findByIdAndDelete(req.params.id).lean().exec()
     return res.status(201).send({eval})
 }catch(e){
         return res.status(500).send({message :e.message , status:"failed"})
     }
 
 })


//*******************evaluation CRUD ******************** */
app.listen(2345,async(req,res)=>{
    await connect()
    console.log("listing to port 2345")
})