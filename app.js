const nedb = require("nedb");
const express = require("express");
const path = require("path");
require('dotenv').config()

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "./public")));

const cookieParser = require('cookie-parser')
app.use(cookieParser())

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

const db = new nedb({ filename: "goals.db", autoload: true });
console.log("db created");

const mustache = require('mustache-express');
app.engine('mustache', mustache());
app.set('view engine', 'mustache');

const router = require('./routes/fitnessRoutes');
app.use('/', router); 



app.listen(3000,()=>{
    console.log("Server listening on port: 3000");
    });
