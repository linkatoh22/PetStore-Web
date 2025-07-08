const express = require("express");

const dotenv =  require("dotenv").config();
const app = express();
const connectDb = require("./config/dbConnection");

const errorHandler = require("./middlewares/errorHandler")
const cors = require("cors");
const cookieParser = require("cookie-parser");
//Change stream
const watchProductVariants = require("./changeStream/ProductCartChangeStream")
const watchPet = require("./changeStream/PetCartChangeStream")
const watchOrder = require("./changeStream/OrderChangeStream")
const PORT=process.env.PORT ||3001;
connectDb().then(()=>{
    watchProductVariants();
    watchPet();
    watchOrder();
});

app.use(cors({
  origin: process.env.ORIGIN,
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

//ROUTES
app.use("/api/auth",require("./routes/authenticationRoutes"));
app.use("/api/pet",require("./routes/PetRoutes"));
app.use("/api/product",require("./routes/ProductRoutes"));
app.use("/api/user",require("./routes/UserRoutes"))
app.use("/api/cart",require("./routes/CartRoutes"))
app.use("/api/order",require("./routes/OrderRoutes"))
app.use("/api/reset-password",require("./routes/ResetPasswordRoutes"))
// app.use("/api/order",require("./routes/OrderRoutes"))

app.use(errorHandler);


app.listen(PORT,()=>{
    console.log("Currently listening on port 3000.....");
})