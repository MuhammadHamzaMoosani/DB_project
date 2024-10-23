const express=require('express')
const app=express()
const db=require('./util/database')
const Tables=require('./util/createTables')
Tables.createTables()
.then(result=>
    {
        console.log('Table created successfully:', result);
    })
.catch(err=>
    {
        console.log('Table creation error:',err)
    })
app.listen(200);
