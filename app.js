const nedb = require("nedb");
const express = require("express");
const path = require("path");
require('dotenv').config()

const cookieParser = require('cookie-parser')
app.use(cookieParser())

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "./public")));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

const db = new nedb({ filename: "goals.db", autoload: true });
console.log("db created");

const mustache = require('mustache-express');
app.engine('mustache', mustache());
app.set('view engine', 'mustache');

const router = require('./routes/fitnessRoutes');
app.use('/', router); 




app.post("/add", function(req,res){
    db.insert({name: req.body.name, goalType: req.body.goals, goalValue: req.body.goalValue, goalDate: req.body.goalDate}, function(err, newDoc){
        if (err){
            console.log("error",err);
        }
        else{
            console.log("Document inserted", newDoc);
        }
    });
});

app.post("/view", function(req,res){
    db.find({_id: req.body.id},function(err,docs){
        if(err){
            console.log("error");
        }
        else{
            console.log("documents retrieved:", docs);
            res.render('goalsData',{
                "goal":docs
            });
        }
    });
});

app.post("/showAll", function(req,res){
    db.find({},function(err,docs){
        if(err){
            console.log("Error");
        }
        else{
            console.log("documents retrieved:", docs);
            console.log("documents retrieved:", docs);
            res.render('allGoalsData',{
                "goal":docs
            });
        }
    });
});

app.post("/update",function(req,res){
    db.update({_id: req.body.id},{$set:{"name": req.body.name, "goalType": req.body.goals, "goalValue":req.body.goalValue, "goalDate": req.body.goalDate}},{},function(err,docs){
        if(err){
            console.log("Error");
        }
        else{
            console.log(docs,"Documents updated");
        }
    });
});

app.post("/delete",function(req,res){
    db.remove({_id: req.body.id},{},function(err,docsRem){
        if (err){
            console.log("Error");
        }
        else{
            console.log(docsRem, "document removed from database");
        }
    });
});

app.get('/close', function(req,res){
    db.close((err) => {
        if (err) {
            res.send('There is some error in closing the database');
            return console.error(err.message);
        }
        console.log('Closing the database connection.');
        res.send('Database connection successfully closed');
    });       
});
 


app.listen(3000,()=>{
    console.log("Server listening on port: 3000");
    });
