require('dotenv').config();
const express = require("express");

const app = express();
const path =require("path")
const hbs = require("hbs");

const auth =require("./auth.js")
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const {json}= require("express");
const bcrypt = require("bcrypt");
app.use(express.urlencoded({extended:false}));
require("./conn.js")
const static_path = path.join(__dirname, "./public");
const template_path = path.join(__dirname, "./templates/views");
const partials_path = path.join(__dirname, "./templates/partials")
 
const Stud = require("./StudSchema.js");

app.set("view engine", "hbs")
app.set("views",template_path )
hbs.registerPartials(partials_path)
app.use(express.static(static_path));
app.listen(8000,(req,res)=>{
console.log("listening at port 8000")
})
app.get("/logout", auth, async(req,res)=>{
     res.clearCookie("jwt");
     res.send("sucessfully logout")
     // req.user.tokens = req.user.tokens.filter((token)=>{
     //      return token.token !== req.token
     // })
     // await req.user.save()
     req.user.tokens = []
     console.log(req.user)

})
app.get("/about", auth,(req,res)=>{

     res.send("ok verified")
})
app.use(express.json());
app.get("/",(req,res)=>{
        res.render("index");
})
app.get("/login",(req,res)=>{
     res.render("login");
})
console.log(process.env.SECRET_KEY)


app.post("/user", async(req,res)=>{
      try{
     const e=req.body.email2
        
    const user3 = await Stud.find({email:e});
    
     const password2= req.body.password2
     console.log(user3)
     console.log(user3[0].password)

    
     const result2= await bcrypt.compare(password2,  user3[0].password)
    
//     const email = req.body.email2
//     const password = req.body.password2
//     res.send(`the entered email is ${email} and password is ${password}`)
     

     const token= await user3[0].generateAuthToken()
     console.log("the token is "+ token);
      res.cookie("jwt", token, {
          expires: new Date(Date.now()+30000),
          httpOnly:true
      });

     
      
      
     if(result2){
          res.send("welcome user")
     }
     else{
          res.send("nahi bhai details match nahi ki ")
     }
     }catch(e){
          res.send("invalid details")
          console.log(e)
        
     } 
})


app.post("/register",async(req,res)=>{
try{  
     
     const password = req.body.password
    
     
     const cpassword = req.body.confirmPassword
     console.log(req.body.name)
     console.log(cpassword)
     
     if(password === cpassword){
     const doc = new Stud({
        name:req.body.name,
        email:req.body.email,
        password: password,
        confirmPassword:cpassword
     });
     console.log("perfect")
     // const token= await doc.generateAuthToken();
     // console.log("the token is "+ token);
     const result = await doc.save();
    
     res.send("registration completed");}
     else if(password!== cpassword){
          res.send("password doesn't match")
     }
     else{
          res.send("plz fill form correctly")
     }
    
     
}catch(e){
     console.log(e)
     res.send("kindly fill the form properly")
}
})
const fnd = async()=>{
     try{
          const user2 = await Stud.find({email:"bha@123"})
          const result = await bcrypt.compare("b",user2[0].password)
          console.log(user2)
          console.log(result)
          console.log(user2[0].password)
     }
    catch(e){
      console.log(e)
    }
}
// fnd();