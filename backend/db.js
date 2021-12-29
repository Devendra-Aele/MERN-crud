const mongoose=require("mongoose")
const mongouri="mongodb://localhost:27017/hello?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"
const connectTomongo=()=>{
    mongoose.connect(mongouri,()=>{
        console.log("connect to mongo")
    })
}
module.exports = connectTomongo