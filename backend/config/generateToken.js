const jwt=require("jsonwebtoken");

const generateToken=(id)=>{
    return jwt.sigh({id},process.env.jwt_SECRET,{
        expiresIn:"30d",

    })
}

module.exports=generateToken