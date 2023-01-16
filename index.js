const express = require("express")
const {user}=require("./routes/user.route")
const {posts}=require("./routes/posts.route")
const {autheticate}=require("./middleware/authenticate.middleware")
const {connection}=require("./config/db")
const app=express()

app.use(express.json())
app.use("/user",user)
app.use(autheticate)
app.use("/posts",posts)

















app.listen(3080,async()=>{
 try {
  await connection
  console.log("DB connected ")
 } catch (error) {
  console.log(error+"error connecting DB")
  console.log("error connecting DB");
 }
 console.log("server running at localhost:3080");
})

