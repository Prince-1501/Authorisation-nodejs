const express = require('express');
const router = express.Router();
const User = require('./../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var verifyToken = require('./../verifyToken');

require("dotenv").config();

//login handle
router.post('/login', async(req, res)=>{
  const { email, password } = req.body;
  let user = await User.findOne({email});
  if(!user) return res.status(400).json({message: "User Not Exist"});

  const isMatch = await bcrypt.compare(password, user.password);
  if(!isMatch) return res.status(401).send({ auth: false, token: null });

  var token = jwt.sign({id: user._id}, process.env.SECRET_KEY , {expiresIn: 86400});
  res.status(200).send({auth: true, token})

});

//register handle
router.post('/register', async (req, res)=>{
  const {name, email, password, password2} = req.body;
  let errors = [];

  if(!name || !email || !password || !password2){
    errors.push({msg: "Please fill in all fields"})
  }

  //check if match
  if(password  !== password2){
    errors.push({msg: 'passwords dont match'})
  }
  //check if password is more than 6 characters
  if(password.length < 6){
    errors.push({msg: 'password atleast 6 characters'})
  }

  if(errors.length > 0){
    res.send(errors);
  }else{
    //validation passed
    let userExist = await User.findOne({email});
    if(userExist){
      res.send({msg:"user already exists"})
    }else{
      const newUser = new User({
        name,
        email,
        password
      });
      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(password, salt);

      await newUser.save();

      jwt.sign(
        {id : newUser._id},
        process.env.SECRET_KEY,
        {
           expiresIn: 86400 // expires in 24 hours
        },
        (err, token)=>{
           if (err) throw err;
           res.status(200).json({
             auth: true,
             token
           });
        }
      );
    } // else ends here
  }

});



router.get('/me', verifyToken, (req, res, next)=>{
  // //get the user id based on the token we got back from the register endpoint
  // // because our payload is only the userID
  // // token represent the payload as a encrypted string
  // var token = req.headers['x-access-token'];
  // if(!token) return res.status(401).send({auth: false, message: 'No Token provided'})
  // jwt.verify(token, 'randomString', (err, decoded)=>{
  //   if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
  //
  //   //find the actual user
  //   // we don't have to show password --> projection
    User.findById(req.userId, {password:0} , (err, user)=>{
      if (err) return res.status(500).send("There was a problem finding the user.");
      if (!user) return res.status(404).send("No user found.");
      res.status(200).send(user);
    })

})

module.exports = router;
