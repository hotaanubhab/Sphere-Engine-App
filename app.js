//dependencies
const env = require("./environment.js");
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const request = require('request');
var favicon = require('serve-favicon');

//app
const app = express();

//Mongo connection and listen
const dbURI = env.MONGO_URI;
mongoose.connect(dbURI, {useNewUrlParser:true,useUnifiedTopology:true})
    .then((result)=> {
        console.log('Connected to DB');
        //listening
        app.listen(process.env.PORT || 3000);
    })
    .catch((err) => console.log(err));

//view engine
app.set('view engine','ejs')

//middleware
app.use(express.static('public'));
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(express.urlencoded({ extended:true }));
app.use(express.json());
app.use(morgan('dev'));
