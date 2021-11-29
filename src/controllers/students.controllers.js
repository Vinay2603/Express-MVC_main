const express = require("express")

const Student = require("../models/student.model")

const router = express.Router()

//*******************student CRUD ******************** */
router.post("", async(req,res)=>{
    try{
        const student =await  Student.create(req.body)
        return res.status(200).send(student)    
 
 
    }catch(e){
        return res.status(500).json({message : e.message , status : "failed" })
    }
 })
 
 router.get("", async (req,res)=>{
     try{
         const student = await Student.find().populate("user_id").lean().exec()
         return res.status(201).send({student})
     }catch(e){
         return res.status(500).send({message :e.message , status:"failed"})
     }
 })
 
 router.get("/:id", async (req,res)=>{
     try{
         const student = await Student.findById(req.params.id).lean().exec()
         return res.status(201).send({student})
     }catch(e){
         return res.status(500).send({message :e.message , status:"failed"})
     }
 })
 
 router.patch("/:id", async(req,res)=>{
     try{
         const student =await Student.findByIdAndUpdate(req.params.id , req.body,{new:true}).lean().exec()
         return res.status(201).send(student)
     }catch(e){
         return res.status(500).send({message :e.message , status:"failed"})
     }
 })
 
 router.delete("/:id", async(req,res)=>{
 try{
     const student = await Student.findByIdAndDelete(req.params.id).lean().exec()
     return res.status(201).send({student})
 }catch(e){
         return res.status(500).send({message :e.message , status:"failed"})
     }
 
 })

//*******************student CRUD ******************** */

module.exports = router 