const jwtToken = require('jsonwebtoken')
const path  = require('path');

const UserVerifier =async(req,res,next)=>{
    try{
        const data = req.cookies?.uid;
        if(!data) return res.status(404).json({"errorMessage":"user not verified"});


        try{
            const decode = jwtToken.verify(data,process.env.jwt_secreat);
            delete decode.password;
            req.user = decode;
            
            next();

        }catch(err){
            res.status(400).json({
                "errorMessage":"Invalid user"
            })
        }

    }catch(err){
        res.status(400).json({
            "errorMessage":"Invalid Login"

        })
    }
    
    
}

module.exports = {UserVerifier};