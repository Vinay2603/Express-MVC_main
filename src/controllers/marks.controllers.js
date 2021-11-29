const express = require("express")


const Mark = require("../models/mark.model")

const router = express.Router()


 /******************  marks  CRUD ****************************/
 
router.post("", async(req,res)=>{
    try{
        const mark =await  Mark.create(req.body)
        return res.status(200).send(mark)    
 
 
    }catch(e){
        return res.status(500).json({message : e.message , status : "failed" })
    }
 })
 
router.get("", async (req,res)=>{
     try{
         const mark = await Mark.find().populate("student_id").lean().exec()
         return res.status(201).send({mark})
     }catch(e){
         return res.status(500).send({message :e.message , status:"failed"})
     }
 })
 
router.get("/:id", async (req,res)=>{
     try{
         const mark = await Mark.findById(req.params.id).populate({ 
            path: 'student_id',
            populate: {
              path: 'user_id'
            } 
         }).lean().exec()
         return res.status(201).send({mark})
     }catch(e){
         return res.status(500).send({message :e.message , status:"failed"})
     }
 })
 
router.patch("/:id", async(req,res)=>{
     try{
         const mark =await Mark.findByIdAndUpdate(req.params.id , req.body,{new:true}).lean().exec()
         return res.status(201).send(mark)
     }catch(e){
         return res.status(500).send({message :e.message , status:"failed"})
     }
 })
 
router.delete("/:id", async(req,res)=>{
 try{
     const mark = await Mark.findByIdAndDelete(req.params.id).lean().exec()
     return res.status(201).send({mark})
 }catch(e){
         return res.status(500).send({message :e.message , status:"failed"})
     }
 
 })

/******************  marks  CRUD ****************************/
module.exports = router