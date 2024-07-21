const usermodel = require("../Models/userModel");
const bcrypt= require("bcryptjs");
const jwt=require("jsonwebtoken")
const {generateTokens}=require("../utills/generateTokens")


module.exports.registerUser=async (req, res) => {
    try {
        const { fullname, password, email } = req.body;
            
        bcrypt.genSalt(10 ,(err , salt)=>{
            bcrypt.hash(password , salt, async(err, hash)=>{
                if(err) return res.send(err.message)
                    else{
                }
                
        if (!fullname || !password || !email) {
            return res.status(400).send("Please fill all details properly");
        }

        let user = await usermodel.findOne({ email });
        if (user) {
            return res.status(409).send(`User with email ${email} already exists. Try logging in.`);
        }

        user = new usermodel({ fullname, password:hash, email });
        await user.save();
     
        let token =generateTokens(user);
        res.cookie("token", token);

       
        res.status(201).send("User registered successfully.");
            })
        })
     
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal server error.");
    }
};
module.exports.loginUser=async (req, res)=>{
    let {email, password}=req.body;
  let user = await  usermodel.findOne({email:email});
  if(!user) return res.send("incorrect credentials , Create Account first");

  bcrypt.compare(password , user.password , (err, result)=>{
    if (err)res.status(401).send(err.message);
    res.send(result);

     let token = generateTokens(user);
     res.cookie("token", token);
  } )

}