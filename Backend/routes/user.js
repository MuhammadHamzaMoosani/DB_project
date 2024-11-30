const express=require('express');
const router=express.Router();
// const getInfo=require('../controller/getInfo')
const User=require('../controller/user')

router.get('/',User.getUsers);
router.post('/login',User.loginUser);
router.post('/otp',User.otpCheck)
router.post('loginCheck',User.active_user)
router.post('checkOtpExit',User.checkOtpExit)
router.post('logOut',User.logOut)
router.post('/signUp',User.signUp)
router.delete('/delete',User.deleteUser);
module.exports = router;
