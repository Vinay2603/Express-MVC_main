const mongoose = require("mongoose")

const connect = ()=>{
    return  mongoose.connect("mongodb+srv://vinay123:vinay123@cluster0.jchco.mongodb.net/test")
  }

  module.exports = connect 
