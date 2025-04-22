const User = require("../../models/userModel");
const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// passport.use(new GoogleStrategy({
//     clientID:process.env.GOOGLE_CLIENT_ID,
//     clientSecret:process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL:process.env.GOOGLE_CALLBACK_URL 
// },
//     async (accessToken,refreshToken,profile,done) =>{
//         let user = await User.findOne({googleId:profile.id});
//         if(!user){
//             user = await User.create(
//                 {
//                     googleId:pro
//                 }
//             )
//         }

//         return done(null,user);
//     }
    
// ))
