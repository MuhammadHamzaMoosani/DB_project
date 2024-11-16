const express=require('express');
const router=express.Router();
// const getInfo=require('../controller/getInfo')
const Course=require('../controller/courses')

router.get('/',Course.getCourse);
module.exports = router;
