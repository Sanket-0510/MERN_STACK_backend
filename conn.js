const mongoose  = require('mongoose');
const express = require("express");
mongoose.set('strictQuery', false);
mongoose
     .connect("mongodb+srv://socio:socio1234@cluster0.nqkzkey.mongodb.net/?retryWrites=true&w=majority",{useNewUrlParser: true,useUnifiedTopology: true,})
     .then(()=>{
                         console.log(e)
     },(e)=>{
                         console.log(e)
     });
     
     
