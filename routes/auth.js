const express=require('express');
const bcryptjs = require('bcryptjs');
const jsonwebtoken=require('jsonwebtoken');



const User=require('../models/user');
const auth = require('../middleware/auth');

const authRouter=express.Router();
//we will not use only express then we have to 
 //listen it that why we will use express.Router instead

 authRouter.post("/api/signup", async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res
          .status(400)
          .json({ msg: "User with same email already exists!" });
      }
      const hashedpassword = await bcryptjs.hash(password,6);
  
      let user = new User({
        email,
        password:hashedpassword,
        name,
      });
      user = await user.save();
      res.json(user);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });


authRouter.post("/api/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "User with this email does not exist!" });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Incorrect password." });
    }

    const token = jsonwebtoken.sign({ id: user._id }, "passwordKey");
    res.json({ token, ... user ._doc });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


authRouter.post("/tokenIsValid", async (req, res) => {
  try {

    const token =req.header('x-auth-token');
    if (!token)      return res.json(false);
    const verified=jsonwebtoken.verify(token,"passwordKey");
    if(!verified) return res.json(false);

     const user =await user.findById(verified.id);
     if(!user) return res.json(true);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

authRouter.get('/',auth,async(req,res)=>{
const user =await user.findById(req.user);
res.json({...user._doc,token:req.token});
});


 module.exports =authRouter;