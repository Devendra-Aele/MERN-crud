// const connectTomongo=require("./db")
// const express = require('express')
// connectTomongo()
// const app = express()
// const port = 5000


// app.use(express.json())
// app.use('/api/auth',require('./routes/auth'))
// // app.use('/api/notes',require('./routes/notes'))


// app.get('/', (req, res) => {
//   res.send('My first Data base api using mongoose')
// })
// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })




const connectTomongo=require('./db')
const express =require('express')
const port =5000;
const app=express()
connectTomongo()
app.use(express.json())
app.get('/',(req,res)=>{
  console.log("Hello I Am /")
  res.send("Hello I Am /")
})
app.use('/auth',require('./routes/auth'))
app.use('/notes',require('./routes/notes'))
app.listen(port,()=>{
  console.log("App is listen in port "+ port)
})