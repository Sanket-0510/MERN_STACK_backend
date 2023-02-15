

const jwt = require("jsonwebtoken");
const Stud = require("./StudSchema.js")



const auth= async(req,res,next)=>{
try{
 const token= req.cookies.jwt;
 const verifyUser = jwt.verify(token, process.env.SECRET_KEY)
 const user = await Stud.findOne({_id:verifyUser._id})
 console.log(user)
 console.log(verifyUser)
 req.token = token
 req.user = user;
 next();
}
catch(e){
                         console.log(e)
}}

module.exports = auth