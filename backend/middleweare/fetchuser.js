const jwt = require('jsonwebtoken')
const middlefechdata=(req,res,next)=>{
    const token=req.header("auth-token") 
    if(!token){
        return res.status(401).send({error:"token is not matched in data "})
    }
    try {
        const data=jwt.verify(token,"HelloDevendra")
        req.user=data.user
        next()
    } catch (error) {
        return res.status(401).send({error:"token is not matched in data "})
    }
  
}

module.exports=middlefechdata