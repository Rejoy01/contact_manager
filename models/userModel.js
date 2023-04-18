const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
    username:{
        type : 'string',
        required:[true , "please add the username"]
    },
    email:{
        type:"string",
        required:[true , "please add the email"],
        unique: [true,"email is already taken"]
    },
    password:{
        type:"string",
        required:[true , "please add the password"]
    }

},
{
    timestamps:true
}
)
module.exports = mongoose.model("User",userSchema)