const express = require('express');
const User = require('../models/User.js');
const path = require('path');

const registrationHandler = express.Router();


registrationHandler.use(require('../middleware/validate.js'))

registrationHandler.post('/',async(req,res)=>{
    try{ 
        const {name, email, password} = req.body;
        const _user = await User.find({email},{id:0,password:0,__v:0});

        if(_user.length > 0){
            return res.status(400).sendFile(path.join(__dirname,'..','public','error','index.html'));
        }

        const user = await User.create({name,email,password})
        return res.sendFile(path.join(__dirname,'..','public','success','index.html'));
    }
    catch(err){
        console.log(err)
        return res.status(400).sendFile(path.join(__dirname,'..','public','error','servererror.html'))
    }
})


registrationHandler.get('/success',(req,res)=>{

})

module.exports = registrationHandler;