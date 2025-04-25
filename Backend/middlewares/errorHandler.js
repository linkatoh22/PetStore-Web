const {constant} = require("../constanst");

const errorHandler = (err,req,res,next)=>{
    
    const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
    
    switch(statusCode){

        case constant.VALIDATION_ERROR:
            res.json({
                status:"FAILED",
                title:"Validation Failed",
                code:statusCode,
                
                message:err.message,
                stackTrace:err.stack
            });
            break;
            case constant.NOT_FOUND:
                res.json({
                status:"FAILED",
                title:"Not Found",
                message:err.message,
                stackTrace:err.stack});
                break;
            case constant.UNAUTHORIZED:
                    res.json({status:"FAILED",title:"UNAUTHORIZED",
                    message:err.message,
                    stackTrace:err.stack});
                    break;
            case constant.FORBIDDEN:
                        res.json({status:"FAILED",title:"FORBIDDEN",
                        message:err.message,
                        stackTrace:err.stack}); 
                        break;  
            case constant.SERVER_ERROR:
                            res.json({status:"FAILED",title:"SERVER ERROR",
                            message:err.message,
                            stackTrace:err.stack});     
                            break;        
            default:
                console.log("No error, All good!");
                break;

    }



}
module.exports= errorHandler;