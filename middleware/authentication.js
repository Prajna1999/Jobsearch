const User=require('../models/User');
const jwt=require('jsonwebtoken');
const { UnauthenticatedError } = require("../errors");

const authUser=(req,res,next)=>{
    // check header
    const authHeader=req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnauthenticatedError('Authentication Invalid');
    }

    const token=authHeader.split(' ')[1];

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        // send the decoded user
        req.user={id:decoded.id,name:decoded.name};
        // to the next route
        next();
        
    }catch(e){
        throw new UnauthenticatedError('Authentication Invalid');
    }
}
module.exports = authUser