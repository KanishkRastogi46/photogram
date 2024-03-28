const express= require('express');
const router= express.Router();
const { register, login, verifyEmail, logout, forgetPassword, resetPassword }= require('../controllers/user-controller')
const isAuthenticated= require('../middleware/authenticated-user');
const userModel= require('../model/user-model');
const upload= require('../utils/multer');

router.route('/register').post(register);

router.route('/verifyemail').post(verifyEmail);

router.route('/login').post(login);

router.route('/profile').post(isAuthenticated, async function(req, res){
    let token = req.body?.refreshtoken || "";
    let user= await userModel.findOne({refreshtoken: token});
    return res.json({
        message: "Authenticated user",
        success: true,
        user
    });
})

router.route('/logout').post(logout);

router.route('/forgetpassword').post(forgetPassword);

router.route('/resetpassword').post(resetPassword);

router.route('/profilechange').post(upload.single('avatar'), async function(req, res){
    console.log(req.body, req.file);
    if(req.file===undefined){
        return res.json({
            message: "No image found",
            success: false
        });
    }
    let user= await userModel.findOne({username: req.body.username});
    if(!user){
        return res.json({
            message: "User not found",
            success: false
        })
    }
    user.profileimage= req.file.path;
    await user.save();
    return res.json({
        message: "Avatar changed successfully",
        success: true,
        profileimage: req.file.path,
    });
})

module.exports= router;