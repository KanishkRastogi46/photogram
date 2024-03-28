const nodemailer= require('nodemailer');
const bcrypt= require('bcrypt');
const userModel= require('../model/user-model');


const forgetPasswordEmail= async function(email){
    let hashedMail= await bcrypt.hash(email, 10);

    let user= await userModel.findOneAndUpdate(
        {email},
        {forgetpasswordtoken: hashedMail},
        {new: true, runValidators: true}
    )
    await user.save();

    const transport = nodemailer.createTransport({
        service: "Gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "rastogikanishk746@gmail.com",
          pass: "lxaz smoz fkvb jcuf"
        }
    });

    var message = {
        from: "rastogikanishk746@gmail.co",
        to: email,
        subject: "Forget Password",
        html: `<div style="display: flex; justify-content: center; align-items: center"><p style="text-transform: uppercase">click <a href="http://localhost:5173/resetpassword">here</a> to change your password</p></div>`,
    };
    transport.sendMail(message);
    return hashedMail;
};

module.exports= forgetPasswordEmail;