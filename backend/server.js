const dotenv = require('dotenv').config();

const express = require('express');
const PORT = 2000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// routes
const productRoutes = require('./routes/products');
const authRoutes = require('./routes/auth');

const mongoose = require('mongoose');
const errorHandler = require('./middlewares/errorHandler');


const app = express();

// db connection
const DB_URL = ''

mongoose.connect(DB_URL).then(() => {
    console.log('Database connected...');
}).catch(err => {
    console.log(`Something went wrong in db: ${err}`);
})

// built-in middlewares?
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
// routes ?
 // product routes
 app.use('/pizza/api/v1',productRoutes);

 // auth routes
 app.use('/pizza/api/v1',authRoutes);

 

// errorHandler ?
app.use(errorHandler);
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));