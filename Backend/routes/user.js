const express=require('express');
const router=express.Router();
// const getInfo=require('../controller/getInfo')
const User=require('../controller/user')

router.get('/', User.getUsers);
router.post('/login', User.loginUser);
router.post('/otp',User.otpCheck)
router.post('/signUp',User.signUp)
router.delete('/delete',User.deleteUser);
router.post("/bookmark", User.authenticateToken, User.addBookmark); //Added by Asna
router.get("/bookmarks", User.authenticateToken, User.getBookmarks); //Added by Asna

module.exports = router;
