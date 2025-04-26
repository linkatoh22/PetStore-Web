const jwt = require("jsonwebtoken");

const AuthMiddleware = (req,res,next)=>{

    try{
        const authHeader = req.headers['authorization'];

        const token = authHeader && authHeader.split(' ')[1];

        if(!token){
            res.status(404)
            throw Error("Access token missing or invalid");
        }
        jwt.verify(token,process.env.ACCESS_TOKEN_KEY,(err,decoded)=>{
            if(err){
                res.status(401)
                throw Error("Token is not valid or expired")
            }

            req.user = decoded;
            console.log("req.user: ", req.user)
            next();
        })
        
    }
    catch(error){
        next(error);
    }
}


module.exports = {AuthMiddleware};