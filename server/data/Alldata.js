var mongoose = require('mongoose');
  
var alldata = new mongoose.Schema({
    UserId:{
        type:String,
        required:true
    },
    UserName:{
        type:String,
        required:true
    },
    UserEmail:{
        type:String,
        required:true
    },
    UserPassword:{
        type:String,
        required:true
    },
    UserImage:{
        type:String,
        required:true
    },
    TotalOrders:{
        type:String,
        required:true
    },
    CreatedAt:{
        type:String,
        required:true
    },
    LastLoggedIn:{
        type:String,
        required:true
    },   
});

const Data = mongoose.model('ALLDATA',alldata);
module.exports = Data;