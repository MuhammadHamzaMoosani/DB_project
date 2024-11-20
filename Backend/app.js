const express=require('express')
const app=express()
const db=require('./util/database')
const Tables=require('./util/createTables')
const userRoutes = require('./routes/user');
const courseRoutes = require('./routes/course');
const cors = require('cors'); 

Tables.createTables()
.then(result=>
    {
        console.log('Table created successfully:', result);
    })
.catch(err=>
    {
        console.log('Table creation error:',err)
    })
app.use(cors({
    origin: 'http://localhost:4200', // Replace with your frontend URL or '*' to allow all origins
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Allowed HTTP methods
}));
app.use(express.json()); 
app.use('/users',userRoutes);
app.use('/course',courseRoutes);
// Catch-all handler for undefined routes
app.use((req, res) => {
    res.status(404).send('Route not found');
  });
app.listen(200);
