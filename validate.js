const bcrypt = require('bcryptjs');
const path = require('path');

function validateDetails(req,res,next){
    try{
        let {name,email,password} = req.body;
        //removes all the spacings
        name = name.replaceAll(/\s/g,'');
        email = email.replaceAll(/\s/g,'');
        password = password.replaceAll(/\s/g,'');
        
        //validation
        if((!name||!email||!password)||(name.length<2 || email.length<6 || password.length<8)){
            return res.sendFile(path.join(__dirname,'..','public','error','servererror.html'))
        }

        //password hashing
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);
        req.body.password = hashedPassword;

        next();//calls next handler
    }
    catch(err){
        console.log(err.message);
        return res.status(400).sendFile(path.join(__dirname,'..','public','error','servererror.html'))
    }
}

module.exports = validateDetails;