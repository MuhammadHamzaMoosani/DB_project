const mysql=require('mysql2')
const pool=mysql.createPool(
    {
        host:'localhost',
        user:'root',
        database:'db_project',
        password:'sql123',
        multipleStatements: true, // Add this option

    })
module.exports=pool.promise();