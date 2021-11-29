const express = require("express")

const Eval = require("../models/eval.model")

const router = express.Router()


//*******************evaluation CRUD ******************** */
router.post("", async(req,res)=>{
    try{
        const eval =await  Eval.create(req.body)
        return res.status(200).send(eval)    
 
 
    }catch(e){
        return res.status(500).json({message : e.message , status : "failed" })
    }
 })
 
 router.get("", async (req,res)=>{
     try{
         const eval = await Eval.find().populate("student_id").lean().exec()
         return res.status(201).send({eval})
     }catch(e){
         return res.status(500).send({message :e.message , status:"failed"})
     }
 })
 
 router.get("/:id", async (req,res)=>{
     try{
         const eval = await Eval.findById(req.params.id).lean().exec()
         return res.status(201).send({eval})
     }catch(e){
         return res.status(500).send({message :e.message , status:"failed"})
     }
 })
 
 router.patch("/:id", async(req,res)=>{
     try{
         const eval =await Eval.findByIdAndUpdate(req.params.id , req.body,{new:true}).lean().exec()
         return res.status(201).send(eval)
     }catch(e){
         return res.status(500).send({message :e.message , status:"failed"})
     }
 })
 
 router.delete("/:id", async(req,res)=>{
 try{
     const eval = await Eval.findByIdAndDelete(req.params.id).lean().exec()
     return res.status(201).send({eval})
 }catch(e){
         return res.status(500).send({message :e.message , status:"failed"})
     }
 
 })
//*******************evaluation CRUD ******************** */

module.exports = router