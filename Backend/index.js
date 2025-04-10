const express = require("express");

const dotenv =  require("dotenv").config();
const app = express();
const connectDb = require("./config/dbConnection");

const errorHandler = require("./middlewares/errorHandler")
const cors = require("cors");
const cookieParser = require("cookie-parser");
const PORT=process.env.PORT ||3001;
connectDb();
app.use(cors());

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",require("./routes/authenticationRoutes"));
app.use("/api/pet",require("./routes/petRoutes"))
app.use(errorHandler);
app.listen(PORT,()=>{
    console.log("Currently listening on port 3000.....");
})