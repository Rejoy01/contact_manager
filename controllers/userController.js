//@desc Register a user
//@route POST /api/users/register
//@access public
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require("../models/userModel")
const asyncHandler = require("express-async-handler");
const registerUser = asyncHandler(async(req,res)=>{
    const {username,email,password} = req.body;
    if(!username || !email || !password){
        res.status(400)
        throw new Error("All fields are mandatory")
    }
    const userAvailable = await User.findOne({email})
    if(userAvailable){
        res.status(400);
        throw new Error("User is already registered");
    }
    //Hash Password
    const hashedPassword = await bcrypt.hash(password,10);
    console.log("hashed Password : ",hashedPassword);

    const user = await User.create({username,email,password :hashedPassword})

    console.log("user created : ", user);
    if(user){
        res.status(201).json({id_:user.id,email:user.email})
    }else{
        res.status(400);
        throw new Error("user data is not valid")
    }

    res.json({message:"Register the user"})
})

//@desc Register a user
//@route POST /api/users/login
//@access public

const loginUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password ){
        res.status(400)
        throw new Error("All fields are mandatory");
    }
    const user = await User.findOne({email})

    if(user && await bcrypt.compare(password,user.password)){

        //payload
        const accessToken = jwt.sign({
            user:{
                username : user.username,
                email: user.email,
                id: user.id,
            },
        },
            process.env.ACCESS_TOKEN_SECRET ,
            {expiresIn:'15m'}
        )
        res.status(200).json({
            accessToken
        })
    }else{
        //email or password is not valid
        res.status(401)
        throw new Error("Email or password is not valid")
    }
}) 

//@desc current user info
//@route POST /api/users/curreent
//@access private

const currentUser = asyncHandler(async(req,res)=>{
    res.json(req.user)
})

module.exports = {registerUser,loginUser,currentUser}