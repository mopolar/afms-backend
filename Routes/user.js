const express = require('express')
const User = require('../models/user')
const Device = require('../models/device')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const router = express.Router();

router.post("/signup", (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash,
        device_number: req.body.device_number
      });
      console.log(user)
      console.log(Device.findOne({device_number: req.body.device_number}))
      Device.findOne({device_number: req.body.device_number}).then(device1=>{
        if(device1){
          User.findOne({email:req.body.email}).then(user1=>{
            if(user1){
              return res.status(401).json({
                message: "User Already Exist"
              })
            }

            user.save().then(result => {
              if(!result){
                return res.status(500).json({
                  message: "Error Creating USer"
                })
              }
              res.status(201).json({
                message: "User created!",
                result: result
              });
            })
          })  
        } else{
          return res.status(401).json({
            message: "Device Number NOT Existed"
          })
        }
      }).catch(err => {
        res.status(500).json({
          error: err
        });
      });
    })
   
  });


  router.post("/login", (req, res, next) => {
    let fetchedUser;
  
    User.findOne({email:req.body.email}).then(user=>{
      if(!user){
        return res.status(401).json({
          message: "Auth failed no such user"
        })
      }
      fetchedUser=user;
      return bcrypt.compare(req.body.password, user.password);
    }).then(result=>{
      if(!result){
        return res.status(401).json({
          message: "Auth failed inccorect password"
        })
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id},
        "secret_this_should_be_longer",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id,
        name : fetchedUser.name
      });
    })
    .catch(e=>{
     
      console.log(e)
    
    })
  })
module.exports = router