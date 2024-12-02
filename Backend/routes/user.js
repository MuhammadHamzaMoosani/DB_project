const express=require('express');
const router=express.Router();
// const getInfo=require('../controller/getInfo')
const User=require('../controller/user')


router.get('/loginCheck',User.authenticateToken,User.logInChecker)
router.post('/login', User.loginUser);
router.post('/otp',User.otpCheck)
router.post('checkOtpExit',User.checkOtpExit)
router.get('/logOut',User.authenticateToken,User.logOut)
router.post('/signUp',User.signUp)
router.post('/signUp/otp', User.verifyOtp)
router.delete('/delete',User.deleteUser);
router.post("/bookmark", User.authenticateToken, User.addBookmark); //Added by Asna
router.get("/bookmarks", User.authenticateToken, User.getBookmarks); //Added by Asna
router.get('/', User.getUsers);

module.exports = router;
