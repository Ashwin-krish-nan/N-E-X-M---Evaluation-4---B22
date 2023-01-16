const express = require("express")
const {postsmodel}=require("../models/posts.model")
const jwt = require('jsonwebtoken');

const posts=express.Router()



posts.get("/",async(req,res)=>{
 let query=req.query
try {
 const posts=await postsmodel.find(query)
 res.send(posts)
} catch (error) {
 console.log(error);
 res.send("error getting data from dataBase")
}
})


posts.post("/create",async(req,res)=>{
 let body=req.body
try {
const posts=new postsmodel(body)
await posts.save()
 res.send("post have posted on the data")
} catch (error) {
 console.log(error);
 res.send("error posting")
}
})

posts.patch("/update/:id",async(req,res)=>{
const id=req.params.id
const body=req.body
const posts=await postsmodel.findOne({"_id":id})
const userID_inpost=posts.userID
const userID_inreq=req.body.userID
try {
 if(userID_inpost!==userID_inreq){
  res.send({"msg":"you are not authorized"})
 }else{
  await postsmodel.findByIdAndUpdate({_id:id},body)
  res.send("posts have been updated")
 }
} catch (error) {
 console.log(error);
 res.send("error updating")
}
})

posts.delete("/delete/:id",async(req,res)=>{
 const id=req.params.id
const body=req.body
const posts=await postsmodel.findOne({"_id":id})
const userID_inpost=posts.userID
const userID_inreq=req.body.userID
try {
 if(userID_inpost!==userID_inreq){
  res.send({"msg":"you are not authorized"})
 }else{
  await postsmodel.findByIdAndDelete({_id:id},body)
  res.send("posts have been updated")
 }
} catch (error) {
 console.log(error);
 res.send("error updating")
}
})


module.exports={
 posts
}