const User=require('../models/users')

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
exports.loginUser=(req,res,next)=>
{
    const email = req.body.email;
    const password = req.body.password;
    User.findByEmailPassword(email,password)
    .then(([response])=>
        {
            if(response.length==0)
                {
                    res.status(403).json(
                        {
                            success:true,
                            messsage:"Incorrect credentials "
                        })
                }
            res.status(200).json(
                {
                    success:true,
                    response:response
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
exports.signUp=(req,res,next)=>
    {
        const email = req.body.User_email;
        const password = req.body.User_password;
        const name=req.body.User_name;
        const User_Type='Student'
        const user=new User(11,name,email,password,User_Type)
        user.save(email,password)
        .then(([response])=>
            {
                res.status(200).json(
                    {
                        success:true,
                        response:response
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
    