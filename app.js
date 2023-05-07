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



const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

