const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const transaction = require('./routes/transaction');
const user = require('./routes/user');
const connectDB = require('./config/db');

dotenv.config({path: './config/config.env'});
const PORT = process.env.PORT || 5000;

connectDB();

const app = express();
app.use(express.json());
app.use('/api/user', user)
app.use('/api/transaction', transaction);



app.listen(PORT, console.log(`Server ruuning at ${PORT}`));
