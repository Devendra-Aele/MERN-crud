const connectTomongo=require("./db")
const express = require('express')
connectTomongo()
const app = express()
const port = 5000
app.use(express.json())


app.get('/', (req, res) => {
  res.send('My first Data base api using mongoose')
})
app.use('/api/auth',require('./routes/auth'))
// app.use('/api/notes',require('./routes/notes'))
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})