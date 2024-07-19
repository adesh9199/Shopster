const mongoose= require('mongoose');


const AdminSchema=mongoose.Schema({
fullname:{
    type:String,
    minlength:3,
    trim:true,
},
email:String,
password:String,
products:{
    type:Array,
    default:[],
},
picture:String,
gstin:String
});

module.exports=mongoose.model("Admin", AdminSchema)
