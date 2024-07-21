const express=require('express');
const app=express();
const cookieParser=require('cookie-parser');
const path=require('path');
const db=require("./config/mongoose-connect");
const adminRoute=require("./Router/adminRoute");
const userRoute=require("./Router/userRoute");
const productRoute=require("./Router/productRoute");
const indexRoute=require("./Router/indexRoute");
 require("dotenv").config();// we can use all variable from .env in process


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");


app.use("/admin" , adminRoute);
app.use("/user" , userRoute);
app.use("/product" , productRoute);
app.use("/" , indexRoute);

const port=3000;
app.listen(port ,()=>{
    console.log(`Server running on port ${port}`)
})