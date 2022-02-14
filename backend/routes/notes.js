const express=require('express')
const router=express.Router()
const Note=require('../modal/Noteschama')
const middlefetchdata=require("../middleweare/fetchuser")
const {body,validationResult}=require('express-validator')

// ====================================================================
// ===============Fetch All Notes By Get Method========================
// ====================================================================
router.get('/fetchalldata',middlefetchdata,async(req,res,next)=>{
     try {
      const notes =await Note.find({user:req.user.id})
      res.json(notes)
     } catch (error) {
           console.log(error.message)
           res.status(500).send("internal server error")
     }
})

// ====================================================================
// ===============Add Notes By Post Method=============================
// ====================================================================
router.post('/add_note',middlefetchdata,[
      body("title").isLength({ min: 3 }),
      body("discription",'please add sore than 50 char').isLength({ min: 5 }),
      body("tag").isLength({ min: 5 }),
],async(req,res)=>{
      try {
          const errors=validationResult(req)
          const {title,discription,tag}=req.body;
          if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
              }
          const note=new Note({
                title,discription,tag,user:req.user.id
          })
          const NoteData=await note.save();
          res.json(NoteData)
          
    } catch (error) {
          console.log(error.message)
          res.status(500).send('intarnal server error')
    }
})

// ====================================================================
// ===============Update Notes By Put Method===========================
// ====================================================================
router.put('/update/:id',middlefetchdata,
 
      async(req,res)=>{
      try {
            const {title,discription,tag}=req.body;
            const newNote={};
            if(title){newNote.title=title}
            if(discription){newNote.discription=discription}
            if(tag){newNote.tag=tag}
            
            let note = await Note.findById(req.params.id)
            if(!note){return res.stsus(404).send('Note Found')}
            
            if(note.user.toString()!=req.user.id){
                  res.status(401).send('Note Found')
            }
            note=await Note.findByIdAndUpdate(req.params.id, {$set:newNote},{new:true})
            res.json({note})

      } catch (error) {
            console.log(error.message)
            res.status(500).send('some error occured')
      }
})
// ====================================================================
// ===============Update Notes By Put Method===========================
// ====================================================================
router.delete('/delete/:id',middlefetchdata,
      async(req,res)=>{
      try {
            const {title,discription,tag}=req.body;
            let note = await Note.findById(req.params.id)
            if(!note){return res.stsus(404).send('Note Found')}
            
            if(note.user.toString()!=req.user.id){
                  res.status(401).send('Note Found')
            }
            note=await Note.findByIdAndDelete(req.params.id)
            res.json({"Succss":"Notes will Be Deleted" ,note:note})

      } catch (error) {
            console.log(error.message)
            res.status(500).send('some error occured')
      }
})
module.exports=router