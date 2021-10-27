const express = require('express');
const router = express.Router();
const path = require('path');
const Data = require('../data/Alldata');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req,file,cb) =>{
       return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
})

var upload = multer({ storage: storage });
router.get('/details/:UserId',async (req, res) => {
    
    const UserId = req.params.UserId;
    const data = await Data.findOne({UserId:UserId});
    if(data)
    {
        data.LastLoggedIn=Date.now();
        await data.save();
        return res.send(data).json({
            status:201,
            message:"we are providing the details of users"
        });
    }
    else
    {
        return res.json({
            status:201,
            message:"User not found please check your details"
        })
    } 
});
router.put('/update',upload.single('UserImage'),async (req,res)=>{
    const UserImage = `http://localhost:${port}/UserImage/${req.file.filename}`;
    const UserName = req.body.UserName;
    const UserEmail= req.body.UserEmail;
    const UserPassword = req.body.UserPassword;
    const TotalOrders = req.body.TotalOrders;
    const LastLoggedIn = Date.now();
    if(!UserName || !UserEmail || !UserPassword)
    {
        return res.json({
            status: 422,
            message: "please fill all the details"
        })
    }
    try{
        const result = await Data.findOne({UserEmail:UserEmail})
        //console.log(result);
        if(result)
        {
            result.UserName=UserName;
            result.UserEmail=UserEmail;
            result.UserPassword=UserPassword;
            result.UserImage=UserImage;
            result.TotalOrders=TotalOrders;
            result.LastLoggedIn=LastLoggedIn;
            await result.save().then(()=>{
                return res.json({
                    status:201,
                    message: "Details change succesfully"
                })
            }).catch((err)=>{
                return res.json({
                    status:501,
                    message:err
                })
            })
        }
        else
        {
            return res.json({
                status: 422,
                message: "User not exist please check your details"
            })
        }

    }catch(err) {console.log(err);};
    
})
router.get('/image/:UserId',async (req,res)=>{
        const UserId = req.params.UserId;
        const result = await Data.findOne({UserId:UserId});
        if(result)
        {
            return res.json({
                status: 201,
                Image_url: result.UserImage
            })
        }
        else{
            return res.json({
                status: 400,
                message: "user not found please check your details"
            })
        }
        console.log(result.UserImage);
})
router.post('/insert', upload.single('UserImage'), async (req, res, next) => {
    const UserImage = `http://localhost:${port}/UserImage/${req.file.filename}`;
    const UserName = req.body.UserName;
    const UserEmail= req.body.UserEmail;
    const UserId = `${UserName}81820${UserEmail}`;
    const UserPassword = req.body.UserPassword;
    const TotalOrders = req.body.TotalOrders;
    const CreatedAt = Date.now();
    const LastLoggedIn = Date.now();
    if(!UserName || !UserEmail || !UserPassword)
    {
        return res.json({
            status: 422,
            message: "please fill all the details"
        })
    }
    try{
        const result = await Data.findOne({UserEmail:UserEmail})
       // console.log(result);
        if(result)
        {
            return res.json({
                status: 422,
                message: "user allready exist"
            })
        }
        else
        {
            const data= Data({UserId,UserName,UserEmail,UserPassword,UserImage,TotalOrders,CreatedAt,LastLoggedIn})
            const result =await data.save();
            if(result)
            {
                return res.json({
                    status: 200,
                    message: "succsefully inserted the user details"
                })
            }
        }

    }catch(err) {console.log(err);};
    
     
});

router.delete('/delete/:UserId', async (req,res)=>{
        const UserId = req.params.UserId;
        console.log(UserId);
        const result = await Data.deleteOne({UserId:UserId});
        console.log(result);
        if(result.deletedCount)
        {
                return res.json({
                    status: 201,
                    message:"User deleted succsesfully"
                })
        }
})




module.exports = router;