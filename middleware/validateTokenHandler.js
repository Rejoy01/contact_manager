const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const validateToken = asyncHandler(async(req,res,next)=>{
    let token;
    let authheader = req.headers.Authorization || req.header.Authorization;
    if(authheader && authheader.startsWith('Bearer')){
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
            if(err){
                res.status(401);
                throw new Error("User not authorized")
            }
            console.log(decoded);
        })
    }
})