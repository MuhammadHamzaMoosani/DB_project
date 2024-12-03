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
exports.isAdmin = (req, res, next) => {
    if (req.user.User_Type !== "Admin") {
        return res.status(403).json({ message: "Access denied. Admins only." });
    }
    next();
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
                
                let otp=generateRandomString()
                let text=`The otp is ${otp}`
                sendEmail(email, 'Otp', text);
                code=await User.saveCode(response.User_ID,otp)
                
                res.status(200).json(
                    {
                        success:true,
                        message:'Logged In',
                        User_Id:response.User_ID
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
exports.logInChecker=(req,res,next)=>
    {
        res.status(200).json(
            {
                success:true,
            })
    }
exports.active_user=(req,res,next)=>{
    const id=req.body.id
    User.getStatus(id).then(([response])=>
        {
            res.status(200).json(
                {
                    success:true,
                    active:response[0]
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
exports.checkOtpExit=(req,res,next)=>
    {
        let id=req.body.id
        User.getCode(id).then(([response])=>
            {
                if (response[0].code!=null)
                    {
                        res.status(200).json(
                            {
                                success:true,
                                otpExist:true
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
                        console.log(otp)
                        check=await User.deleteCode(id)
                        statusUpdate=await User.setStatus(id,'true')
                        console.log("Response: ", response[0].User_email, response[0].User_password, response[0].User_Type);
                        let tokken=createToken({email:response[0].User_email,password:response[0].User_password, User_Type:response[0].User_Type, id:id})
                        // res.cookie('user', tokken, {
                        //     httpOnly: true,
                        //     secure: true,
                        //     sameSite: 'none',
                        //     maxAge: 2*60 * 60 * 1000 // 1 day in milliseconds
                        // });
                        
                        res.status(200).json(
                        {
                            success:true,
                            message:'Login complete',
                            jwt:tokken
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
exports.logOut=(req,res,next)=>
    {
        console.log(req.user);
        let id=req.user.User_ID
        console.log(id)
        User.setStatus(id,'false').then(([response])=>
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
exports.signUp=async (req,res,next)=>
    {
        const email = req.body.email;
        let password = req.body.password;
        const name = req.body.name;

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; //Added by Asna
        console.log(emailRegex.test(email))
        //Added by Asna from here
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: 'Invalid email format.' });
        } 

        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 8 characters long, include one uppercase letter, one number, and one special character.',
            });
        }
        try {
        //Added by Asna to here
        password = await hashPassword(password)

        const otp = generateRandomString(6);
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now
        const User_Type = req.body.User_Type || 'Student';
        
        // Save user in temporary_users table
        await User.saveTemporaryUser(name, email, password, otp, User_Type, expiresAt);
        // Send OTP via email
        const text = `Your OTP is: ${otp}`;
        await sendEmail(email, 'Signup OTP Verification', text);
        
        res.status(200).json({ success: true, message: 'OTP sent. Please verify to complete signup.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Signup failed. Try again later.' });
        }
};
exports.verifyOtp = async (req, res, next) => {
    const { email, otp } = req.body;

    User.findTemporaryUserByEmail(email)
        .then(async ([rows]) => {
            if (rows.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid or expired OTP.',
                });
            }

            const tempUser = rows[0];

            if (otp === tempUser.otp) {
                // Save user to permanent table
                const user = new User(tempUser.name, tempUser.email, tempUser.password, tempUser.user_type);
                await user.save();

                // Delete temporary user
                await User.deleteTemporaryUser(email);

                // Generate JWT
                const token = jwt.sign(
                    { email: user.email, user_type: user.user_type },
                    secretKey, 
                    { expiresIn: '1h' } 
                );

                res.status(200).json({
                    success: true,
                    message: 'User verified and registered successfully.',
                    jwt: token,
                });
            } else {
                res.status(400).json({
                    success: false,
                    message: 'Incorrect OTP.',
                });
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({
                success: false,
                message: 'OTP verification failed.',
            });
        });
};
exports.resendOtp = async (req, res, next) => {
    const { email } = req.body;

    try {
        // Find temporary user
        const [rows] = await User.findTemporaryUserByEmail(email);
        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: 'No unverified account found with this email.' });
        }

        const tempUser = rows[0];

        // Generate a new OTP and update the database
        const newOtp = generateRandomString(6);
        const newExpiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now
        await User.saveTemporaryUser(
            tempUser.name,
            tempUser.email,
            tempUser.password,
            newOtp,
            tempUser.user_type,
            newExpiresAt
        );

        // Send the new OTP via email
        const text = `Your new OTP is: ${newOtp}`;
        await sendEmail(tempUser.email, 'Resend OTP for Verification', text);

        res.status(200).json({ success: true, message: 'New OTP sent to your email.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to resend OTP. Try again later.' });
    }
};

    
    //Added by Asna
    exports.addBookmark = async (req, res) => {
        try {
            const { Course_id } = req.body;
            const userId = req.user.User_ID; // Access user ID from JWT
    
            await User.addBookmark(userId, Course_id); 
    
            res.status(200).json({ success: true, message: "Course bookmarked successfully." });
        } catch (error) {
            console.error("Bookmark error:", error);
            res.status(500).json({ success: false, message: "Error adding bookmark." });
        }
    };
    
    //Added by Asna
    exports.getBookmarks = async (req, res) => {
        try {
            const userId = req.user.User_ID; // Access user ID from JWT
            console.log("BookMark UserID:", userId)
            const bookmarks = await User.getBookmarks(userId); // Model logic to fetch bookmarks

            console.log(bookmarks)
            res.status(200).json({ success: true, data: bookmarks });
        } catch (error) {
            console.error("Fetch bookmarks error:", error);
            res.status(500).json({ success: false, message: "Error fetching bookmarks." });
        }
    };
    

    exports.deleteBookmarks = async (req, res) => {
        const { courseId } = req.params; // Course ID from request params
    const userId = req.user.User_ID; // User ID from authenticated user

    try {
        await User.deleteBookmarks(courseId, userId);
        res.status(200).json({ success: true, message: "Bookmark removed successfully." });
    } catch (error) {
        console.error("Error deleting bookmark:", error);
        res.status(500).json({ success: false, message: "Error deleting bookmark." });
        
    }
};