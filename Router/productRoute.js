const express=require('express');
const router=express.Router();

router.get("/",(req, res)=>{
    res.send("product route")
})

module.exports=router;