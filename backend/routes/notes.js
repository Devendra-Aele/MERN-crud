const express=require('express')
const router=express.Router()
const Note=require('../modal/Noteschama')
const middlefetchdata=require("../middleweare/fetchuser")
router.get('/fetchalldata',middlefetchdata,async(req,res,next)=>{
      // const =await Note.find({user:req.user.id});
      res.json(note)
})

module.exports=router