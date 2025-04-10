const jwt = require("jsonwebtoken");

const AuthMiddleware = (req,res)=>{

    try{
        const token = req.header("Authorization")?.split(" ")[1];
        if(!token){
            res.status(400)
            throw Error("No token found");
        }
        const decoded = jwt.verify(token,process.env.JWT_KEY);
        req.user = decoded;
        next();
    }
    catch(error){

        if(error.name == "TokenExpiredError"){
            
            return res.status(401).json({ message: "Token expired" });
            
        }
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
        
        
    }
}


module.exports = {AuthMiddleware};