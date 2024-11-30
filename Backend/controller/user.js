const User=require('../models/users')
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const jwt = require('jsonwebtoken'); // Import 'jsonwebtoken' for JWT operations.
const crypto=require('crypto');
const { response } = require('express');

const secretKey = process.env.SECRET_KEY; // A secret key for signing the token (keep it private).

const createToken = (payload) => {
  return jwt.sign(payload, secretKey, { expiresIn: '1h' }); // Create a token with a payload and expiration.
};

// const token = createToken({ userId: 123, email: 'user@example.com' }); // Example payload.
// console.log('JWT Token:', token); // Print the generated token.
const sendEmail = async (to, subject, text) => {
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // Specify your email provider (Gmail)
      auth: {
        user: 'hamzamosani6o@gmail.com', // Your email address
        pass: 'bdgt dfym xsbw cmdy', // Your email password or app password
      },
    });
  
    const mailOptions = {
      from: 'hamzamosani6o@gmail.com', // Sender's email
      to, // Recipient's email address
      subject, // Subject line
      text, // Email content
    };
  
    try {
      const info = await transporter.sendMail(mailOptions); // Send email
      console.log('Email sent:', info.response); // Log success
    } catch (error) {
      console.error('Error sending email:', error); // Log error
    }
  };
  
  // Call the function to send an email (for testing purposes)
  //sendEmail('hamzamoosani@hotmail.com', 'Test Subject', 'This is a test email.');
  
async function hashPassword(password) {
  const saltRounds =4; // Increase for more security.
  return await bcrypt.hash(password, saltRounds);
}

async function verifyPassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}
const generateRandomString = (length = 6) => {
    return crypto.randomBytes(length) // Generates a secure random buffer of the desired length.
      .toString('base64') // Converts the buffer to a base64 string (letters, numbers, symbols).
      .slice(0, length); // Extracts the required number of characters.
  };
//   console.log('Alphanumeric OTP:', generateRandomString());
// hashPassword("Password123").then(password=>
//     {
//         console.log(password)
//     })

exports.getUsers=(req,res,next)=>
{
        User.fetchAll()
        .then(([users])=>
            {
                res.status(200).json(
                    {
                        success:true,
                        Users:users
                    })
            })
        .catch((err)=>
            {
                console.log(err)
                res.status(401).json(
                    {
                        success:false,
                        messsage:err
                    })
            })
}
exports.deleteUser=(req,res,next)=>
{
    const userID = req.body.userID;
    User.delete(userID)
    .then(()=>
        {
            res.status(200).json(
                {
                    success:true,
                })
        })
    .catch((err)=>
        {
            console.log(err)
            res.status(401).json(
                {
                    success:false,
                    messsage:err
                })
        })
}
exports.loginUser=async (req,res,next)=>
{
    const email = req.body.email;
    const password = req.body.password;
    User.findByEmail(email)
    .then(async ([response])=>
        {
            if(response.length==0 || response ==undefined) 
                {
                    res.status(403).json(
                        {
                            success:true,
                            message:"Incorrect credentials "
                        })
                    return
                }
            console.log(response)
            checkPassword=await verifyPassword(password,response[0].User_password)
            if(checkPassword)
            {
                let otp=generateRandomString()
                let text=`The otp is ${otp}`
                sendEmail(email, 'Otp', text);
                User.saveCode(response[0].User_ID,otp)
                
                res.status(200).json(
                    {
                        success:true,
                        message:'Logged In'
                    })
            }
            else
            {
                res.status(403).json(
                    {
                        success:true,
                        message:"Incorrect credentials "
                    })
            }
        })
    .catch((err)=>
        {
            console.log(err)
            res.status(401).json(
                {
                    success:false,
                    messsage:err
                })
        })
}
exports.otpCheck=(req,res,next)=>
    {
        const otp=req.body.otp
        console.log(otp)
        const id=req.body.id
        User.getCode(id).then(async ([response])=>
            {
                if (otp==response[0].code)
                    {
                        check=await User.deleteCode(id)
                        console.log(check)
                        let tokken=createToken({email:email,password:password})
                        res.cookie('myCookie', tokken, {
                            httpOnly: true,
                            secure: true,
                            sameSite: 'none',
                            maxAge: 24 * 60 * 60 * 1000 // 1 day in milliseconds
                        });
                        
                        res.status(200).json(
                        {
                            success:true,
                            message:'Login complete'
                        })  
                    }
            })
            .catch((err)=>
                {
                    console.log(err)
                    res.status(401).json(
                        {
                            success:false,
                            messsage:err
                        })
                })
    }

exports.signUp=async (req,res,next)=>
    {
        const email = req.body.email;
        let password = req.body.password;
        password=await hashPassword(password)
        const name=req.body.User_name;
        const User_Type='Student'
        const user=new User(name,email,password,User_Type)
        user.save()
        .then(([response])=>
            {
                res.status(200).json(
                    {
                        success:true
                    })
            })
        .catch((err)=>
            {
                console.log(err)
                res.status(401).json(
                    {
                        success:false,
                        messsage:err
                    })
            })
    }
    