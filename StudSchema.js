const express= require("express");
const mongoose =require("mongoose");
const bcrypt = require("bcrypt");
const jwt= require("jsonwebtoken");

const StudSchema= new mongoose.Schema({
name:{
type:String,
require:true
},
email:{
type:String,
require:true

},
password:{
   type:String,
   require:true,
   
},
confirmPassword:{
 type:String,
 require:true,
 
},
tokens:
   [{token:{
      type:String,
      require:true
      
   }}]


})
// generating tokens
StudSchema.methods.generateAuthToken = async function(){
   try{
      const token = jwt.sign({_id:this._id.toString()}, process.env.SECRET_KEY);
      this.tokens = this.tokens.concat({token:token})
      await this.save();
      return token
   }
   catch(e){
      console.log("error occured while generating a token"+ e)
   }
}


StudSchema.pre(`save`, async function(next){
   console.log("hi from here")
   if(this.isModified(`password`)){

   this.password = await bcrypt.hash(this.password, 10);
   console.log(`password is ${this.password}`)
   this.confirmPassword = undefined;
   }
   next()
})
const Stud = new mongoose.model("Stud", StudSchema);

module.exports = Stud;
