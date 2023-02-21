const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const transaction = require('./routes/transaction');
const user = require('./routes/user');
const connectDB = require('./config/db');
const cors = require("cors");
dotenv.config({path: './config/config.env'});
const PORT = process.env.PORT || 5000;

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.get('/',(req,res)=>{
  res.header("Access-Control-Allow-Origin",'*');
  res.header("Access-Control-Allow-Methods","GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,Accept, Authorization");
  res.send("Hi API is running");
});
app.use('/api/user', user)
app.use('/api/transaction', transaction);



app.listen(PORT, console.log(`Server ruuning at ${PORT}`));
