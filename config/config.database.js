const mongoose = require('mongoose')
const url = process.env.DATABASE
require('dotenv').config();

mongoose.connect(url,{
    useNewUrlParser:true
})
.then(() => {
    console.log('Successfully connected to database');
})
.catch(err =>{
    console.log('couldnt connected to database'+err);
    process.exit();
})