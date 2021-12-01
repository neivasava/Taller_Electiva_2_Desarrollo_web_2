'use strict';

//import modules
const express = require('express');
const path = require('path');
const routeIndex = require('./routes/index');



//Initializations
const app = express();

app.use(express.static(path.join(__dirname,'public')));

//Settings
app.set('port',process.env.PORT || 3002 );
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

//Middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Routes
app.use('/',routeIndex);

//start server
app.listen(app.get('port'),()=>{
    console.log(`Server Listen to port ${app.get('port')}`);
});
