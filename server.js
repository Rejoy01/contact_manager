const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const connectDb = require('./config/dbConnection');

const app = express();

connectDb();
const dotenv =require("dotenv").config()


const PORT = process.env.PORT || 3000;
console.log(PORT);

// app.listen(PORT, ()=>{
//     console.log(`Sever running on port `);
// })
app.use(express.json());
app.use(errorHandler)
app.use('/api/contacts',require('./Routes/contactRoute'))
app.use('/api/users',require('./Routes/userRoute'))

app.listen(PORT, ()=>{
    console.log(`Sever running on port ${PORT}`);
})