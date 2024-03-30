const wrapper= require('../utils/wrapper');
const userModel= require('../model/user-model')
const bcrypt= require('bcrypt');
const jwt= require('jsonwebtoken');
const forgetPasswordEmail= require('../utils/forgetPasswordEmail');

const sendMail= require('../utils/verifyemail');

const register= function(req, res){
    return wrapper(async function(){
        console.log(req.body);
        let {username, email, password}= req.body;

        if(username==="" || email==="" || password===""){
            return res.json({
                message: "Provide proper user details",
                success: false
            })
        }

        let user= await userModel.findOne({
            $and: [{username},{email}]
        });
        if(user){
            return res.json({
                message: 'User already exists',
                success: false
            })
        }

        let hashed= await bcrypt.hash(password, 10);

        let newUser= await userModel.create({
            username,
            email,
            password: hashed
        });

        let mail= await sendMail(email);
        let createdUser= await userModel.findById({_id: newUser._id});

        return res.json({
            message: "Registration successfull",
            success: true,
            details: createdUser,
            verifyemail: mail
        })
    })
}


const verifyEmail= function(req, res){
    return wrapper(async function(){
        console.log(req.body.verifyemail);
        let token= req.body.verifyemail;
        if(!token){
            return res.json({
                message: "Some error ocurred",
                success: false
            })
        }
        let user= await userModel.findOne({verifytoken: token});
        user.verifytoken= undefined;
        user.isverified= true;
        await user.save();
        return res.json({
            message: "Verification Successfull",
            success: true
        })
    })
}


const login= function(req, res){
    return wrapper(async function(){
        console.log(req.body);
        let {username, password}= req.body;
        if(username==="" || password===""){
            return res.json({
                message: "Provide proper user details",
                success: false
            })
        }

        let user= await userModel.findOne({username});
        if(!user){
            return res.json({
                message: "User doesn't exists",
                success: false
            })
        }

        let checkpassword= await bcrypt.compare(password, user.password);
        if(!checkpassword){
            return res.json({
                message: "Invalid password",
                success: false
            })
        }
        let token= await jwt.sign(
            {
                id: user._id,
                username,
                email: user.email
            }, 
            process.env.JWT_SECRET_TOKEN ,
            {expiresIn: '30d'});
    
            user.refreshtoken= token;
            await user.save();
    
            return res.json({
                        message: "Login Successfull",
                        success: true,
                        userdetails: user,
                        refreshtoken: token
                    })  
    })
}


const logout= function(req, res){
    return wrapper(async function(){
        console.log(req.body.refreshtoken);
        if(!req.body.refreshtoken){
            return res.json({
                message: "Some error occured",
                success: false
            })
        }

        let decodedtoken= await jwt.verify(req.body.refreshtoken, process.env.JWT_SECRET_TOKEN);
        let {id, username, email}= decodedtoken;
        let user= await userModel.findOne({username});
        user.refreshtoken= undefined;
        await user.save();

        return res.json({
            message: "Logout successfull",
            success: true
        })
    })
}

const forgetPassword= function(req, res){
    return wrapper(async function(){
        let {email}= req.body;
        if(email===""){
            return res.json({
                message: "Provide a correct email address",
                success: false
            })
        }
        let user= await userModel.findOne({email});
        if(!user){
            return res.json({
                message: "A user with this email doesn't exist",
                success: false
            })
        }
        let mail= await forgetPasswordEmail(email);
        return res.json({
            message: "Reset your passoword",
            success: true,
            forgetpasswordtoken: mail
        })
    })
}

const resetPassword= function(req, res){
    return wrapper(async function(){
        console.log(req.body);
        let {password, confirmpassword, forgetpasswordtoken}= req.body;
        if(password==="" || confirmpassword==="" || forgetpasswordtoken===""){
            return res.json({
                message: "Fill the details properly",
                success: false
            })
        }

        let user= await userModel.findOne({forgetpasswordtoken});
        let hashedpass= await bcrypt.hash(confirmpassword, 10);
        user.password= hashedpass;
        user.forgetpasswordtoken= undefined;
        await user.save();

        return res.json({
            message: "Password reset successfully",
            success: true
        })
    })
}


const searchprofile= function(req, res){
    return wrapper(async function(){
        let users= await userModel.find({username: req.body.username}).select("username profileimage -_id");
        if(!users){
            return res.json({
                message: "0 user found",
                success: false
            });
        }
        return res.json({
            message: `${users.length} users found`,
            success: true,
            userslist: users
        });
    })
}


module.exports= {
    register,
    login,
    verifyEmail,
    logout,
    forgetPassword,
    resetPassword,
    searchprofile
}