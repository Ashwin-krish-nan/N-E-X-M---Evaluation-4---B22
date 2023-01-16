
const jwt= require('jsonwebtoken');

const autheticate=(req,res,next)=>{
 const token=req.headers.authorization
 if(token){
  const decoded=jwt.verify(token,"masai")
  console.log(token);
  if(decoded){
   const userID=decoded.userID
   console.log(decoded);
   req.body.userID=userID
   next()
  }else{
   res.send("please login first")
  }
 }else{
  res.send("please login first")
 }
}


module.exports={
 autheticate
}