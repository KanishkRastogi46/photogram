const nodemailer= require('nodemailer');
const bcrypt= require('bcrypt');
const userModel= require('../model/user-model');

const sendMail= async function(email){
    let hashedmail= await bcrypt.hash(email, 10);

    let user= await userModel.findOneAndUpdate(
        {email},
        {verifytoken: hashedmail},
        {new:true, runValidators:true}
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
        from: "rastogikanishk746@gmail.com",
        to: email,
        subject: "Email verification",
        html: `<p style="text-transform: uppercase">click <a href="http://localhost:5173/verifyemail">here</a> to verify</p>`,
    };
    transport.sendMail(message);
    return hashedmail;
}

module.exports= sendMail;