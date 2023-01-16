const express = require("express")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {Usermodel}=require("../models/user.model")
const user=express.Router()

user.post("/register",async(req,res)=>{
 let {name,email,gender,password}=req.body
try {
 bcrypt.hash(password, 5, async(err, hash)=> {
    // Store hash in your password DB.
    if(err){
     console.log(err+"hashing error")
    }else{
     const user= new Usermodel({name,email,gender,password:hash})
     await user.save()
     res.send("registered data")
    }
});
} catch (error) {
 console.log(error);
 res.send("error registering")
}
})

user.post("/login",async(req,res)=>{
 let {email,password}=req.body
 try {
  const user=await Usermodel.find({email})
  const hased_password=user[0].password
  // console.log(hased_password);
  if(user.length>0){
   bcrypt.compare(password, hased_password, (err, result)=> {
    // result == true
    if(result){
     const token = jwt.sign({ userID :user[0]._id  }, 'masai');
     res.send({msg:"login successfully",token:token})
    }else{
     res.send("Wrong credentials")
    }
});
  }
  
 } catch (error) {
  console.log(error);
 res.send("error login")
 }
})


















module.exports={
 user
}