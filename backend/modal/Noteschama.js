const mongoose=require('mongoose')
const {Schema}=mongoose
const NotesSchema=new Schema({
    user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"AUTH"
    },
    title:{
        type:String,
        required:true
    },
    discription:{
        type:String,
        required:true,
        unique:false
    },
    tag:{
        type:String,
        required:true
    }
})
module.exports=mongoose.model("NOTES",NotesSchema)