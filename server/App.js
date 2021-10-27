const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const App =express();
const port = 8000;

const DB = "mongodb+srv://aaditytiwari3:aadi@cluster0.ud1d2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"


mongoose.connect(DB,{
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(()=>{
    console.log(`conection sucsesfull`);
}).catch((err)=>{
    console.log(err);
});


App.use('/UserImage', express.static('uploads'));

App.use(require('./Router/auth'));
App.use(bodyParser.urlencoded({ extended: false }))
App.use(bodyParser.json())

App.listen(port,()=>{
    console.log(`server is runing on port no. : ${port}`)
})