const mysql=require('mysql2')
const pool=mysql.createPool(
    {
        host:'sql12.freesqldatabase.com',
        port: 3306,
        user:'sql12745432',
        database:'sql12745432',
        password:'wHmStjBQGv',
        multipleStatements: true, // Add this option

    })
module.exports=pool.promise();