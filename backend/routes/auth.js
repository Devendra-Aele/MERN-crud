const express = require("express")
const router = express.Router()
const User = require("../modal/User")
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const middlefechdata=require("../middleweare/fetchuser")
var jwt = require('jsonwebtoken')


// ====================================================
// ===============Create User end Point=================
// ====================================================
router.post("/create",
  [
    body('email').isEmail(),
    body('name').isLength({ min: 3 }),
    body('password').isLength({ min: 5 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let user = await User.findOne({ email: req.body.email })
    if (user) {
      return res.status(400).json({ errors: "this email is olready exiest" });
    }

    const salt = await bcrypt.genSalt(10);
    secretepass = await bcrypt.hash(req.body.password, salt);
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secretepass,
    })

    const data = {
      user: {
        id: user.id
      }
    }
    const token = jwt.sign(data, "HelloDevendra")
    res.json({ token })
  })


// ====================================================
// ===============LOgin User end Point=================
// ====================================================
router.post("/login",
  [
    body('email').isEmail(),
    body('password').isLength({ min: 5 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    let user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ errors: "Sorry This Email Does Not Exesiste" });
    }
    let bcryptPass = await bcrypt.compare(password, user.password)
    if (!bcryptPass) {
      return res.status(400).json({ errors: "somthing is wrong in this password" });
    }

    const data = {
      user: {
        id: user.id
      }
    }
    const token = jwt.sign(data, "HelloDevendra")
    res.json({ token })
 })


// ====================================================
// ===============Get Logedin Data from User end Point=================
// ====================================================
router.get("/fetch",middlefechdata,async (req, res) => {
  try {
    const user=await User.findById(req.user.id).select("-password")
    res.send(user)
  } catch (error) {
    console.error(error.message)
    res.status(500).send("enternal server error")
  }

    
  })
module.exports = router