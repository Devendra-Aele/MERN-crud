const mongoose=require("mongoose")
// const mongouri="mongodb://localhost:27017/NOTEBOOK?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"
// const mongouri="mongodb+srv://Devendra:devendra@12@cluster0.gfvye.mongodb.net/NOTEBOOK"
const mongouri="mongodb+srv://Devendra:devendra@cluster0.5yqoh.mongodb.net/NOTEBOOK"
const connectTomongo=()=>{
    mongoose.connect(mongouri,()=>{
        console.log("connect to mongo")
    })
}
module.exports = connectTomongo