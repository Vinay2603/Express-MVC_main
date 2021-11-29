const mongoose = require("mongoose")

// **************************  marks Schma **********************/
const  markSchema = new mongoose.Schema ({
    marks :{type : Number ,required:true  },
    student_id:[{
      type: mongoose.Schema.Types.ObjectId,
      ref:"student",
      required:true ,
  }],
    eval_id:[{
      type: mongoose.Schema.Types.ObjectId,
      ref:"eval",
      required:true , 
  }]

},{
  versionKey: false,
  timestamps: true 
})

module.exports = mongoose.model("mark", markSchema)
// **************************  marks Schma **********************/