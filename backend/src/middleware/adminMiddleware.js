const jwt = require("jsonwebtoken");
const User = require("../models/user");
const redisClient = require("../config/redis")
const config = require("../config/env");

const adminMiddleware = async (req,res,next)=>{

    try{
        
        const {token} = req.cookies;
        if(!token)
            throw new Error("Token is not persent");

        const payload = jwt.verify(token,config.JWT_KEY);

        const {_id} = payload;

        if(!_id){
            throw new Error("Invalid token");
        }

        const result = await User.findById(_id);

        if(!result){
            throw new Error("User Doesn't Exist");
        }

        if(result.role !== 'admin'){
            throw new Error("Access Denied");
        }

        // Redis ke blockList mein persent toh nahi hai

        const IsBlocked = await redisClient.exists(`token:${token}`);

        if(IsBlocked)
            throw new Error("Invalid Token");

        req.result = result;


        next();
    }
    catch(err){
        res.status(401).send("Error: "+ err.message)
    }

}


module.exports = adminMiddleware;
