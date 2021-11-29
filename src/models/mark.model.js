const mongoose = require("mongoose")

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

module.exports = mongoose.model("eval", evalSchema)


//***************************** evaluation Schema **************** */