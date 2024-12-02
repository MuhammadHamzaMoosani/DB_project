const User=require('../models/users')
const Course=require('../models/courses')
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const path = require('path');

const jwt = require('jsonwebtoken'); // Import 'jsonwebtoken' for JWT operations.
const crypto=require('crypto');
const { response } = require('express');

const secretKey = process.env.SECRET_KEY; // A secret key for signing the token (keep it private)

const createToken = (payload) => {
    console.log("Create Token")
    const t = jwt.sign({ User_ID: payload.User_ID, email: payload.email, User_Type: payload.User_Type }, secretKey, { expiresIn: '3h' });
    console.log("t: ", t)
  return t; // Create a token with a payload and expiration.
};
async function verifyPassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }
//Added by Asna
exports.authenticateToken = async (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1]; // Bearer <token>
    console.log("Request headers:", req.headers);
    console.log("Token: ", token)
    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        console.log("Decoded:", decoded.email)
        
        const user = await User.findByEmail(decoded.email);
        console.log(user)
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        req.user = { User_ID: user.User_ID, email: user.email, User_Type: user.User_Type };
        console.log("Userid:", req.user.User_ID)
        // { email:user[0].email, password: user[0].password, User_Type: user[0].User_Type}; // Attach user data to the request
        next();
    } catch (error) {
        console.error("JWT Authentication error:", error);
        res.status(403).json({ message: "Invalid token." });
    }
};

exports.loginUser=async (req,res,next)=>
    {
        const email = req.body.email;
        const password = req.body.password;
    
        console.log(email)
        console.log(password)
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
     
        //Added by Asna
        if (!emailRegex.test(email)) {
    
            return res.status(400).json({
                success: false,
                message: 'Invalid email.',
            
            });
        }
    
        User.findByEmail(email)
        .then(async (response)=>
            {   
                if(response.length==0 || response ==undefined) 
                    {
                        res.status(403).json(
                            {
                                
                                success:true,
                                message:"Incorrect credentials hi "
                            })
                        return
                    }
                console.log(response)
                checkPassword=await verifyPassword(password,response.User_password)
                console.log(checkPassword)
                if(checkPassword)
                {
                    if(response.User_Type=="Admin")
                        {
                            let tokken=createToken({email:response.User_email,password:response.User_password, User_Type:response.User_Type, id:response.User_ID})

                            res.status(200).json(
                                {
                                    success:true,
                                    message:'Logged In',
                                    jwt:tokken
                                })
                        }
                    else
                    {
                        res.status(403).json(
                                {
                                    success:true,
                                    message:"User not allowed "
                                }) 
                    }   
                        
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