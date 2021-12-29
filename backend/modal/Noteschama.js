const mongoose=require("mongoose")
const {Schema}=mongoose
const NotesSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    paswword:{
        type:String,
        required:true
    }
})
module.exports=mongoose.model("notes",NotesSchema)