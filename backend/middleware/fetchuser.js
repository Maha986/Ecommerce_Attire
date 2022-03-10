const jwt=require('jsonwebtoken');
const config = require('../config');

//middleware takes 3 arguments so that after the response next function is called. 
const fetchuser=(req,res,next)=>{
    //get use from jwt token and add id to req object 
    const token=req.header('auth-token');
    if(!token)
    {
        res.status(401).send({error:"Please authenticate using a valid token"})
    }
    try{   
        const data = jwt.verify(token,config.JWT_SECRET);
        req.user = data.user;
    }
    catch(error){
        console.log(error);
        res.status(401).send({error:"Please authenticate using a valid token"})
    }
    next();
}
module.exports=fetchuser;