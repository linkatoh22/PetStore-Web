const nodemailer = require("nodemailer")
let transporter =  nodemailer.createTransport({
    service:"gmail",
    secure:true,
    logger:true,
    debug:true,
    secureConnection:false,
    auth :{
        
        user : process.env.USER,
        pass : process.env.PASS

    },
    tls:{

        rejectUnauthorized:true
    }
})

module.exports = {transporter}