const goalsDAO = require("../models/goalsModel.js");
const userDao = require('../models/userModel.js');

const db = new(goalsDAO);
db.init();

exports.showLoginPage = function (req, res) {
  res.render("user/login");
};

exports.handleLogin = function (req, res) {
  // res.redirect("/new");
  res.render("loggedInLanding", {
    title: "Guest Book",
    user: "user"
  });
};

exports.aboutUs = function(req,res){
  res.render("aboutUs");
}

exports.showFitness = function(req,res){
  res.render("fitness");
}
exports.showNutrition = function(req,res){
  res.render("nutrition");
}

exports.showLifestyle = function(req,res){
  res.render("lifestyle");
}

exports.goals_index = function (req, res) {
    db.getAllEntries()
      .then((list) => {
        res.render("allGoalsData", {
          title: "Current Goals",
          goal: list,
        });
      })
      .catch((err) => {
        console.log("promise rejected", err);
      });
  };
  
exports.showNewGoal = function (req, res) {
    res.render("addGoal");
  };

exports.addGoal = function(req,res){
    db.addEntry(req.body.name,req.body.type,req.body.goalValue,req.body.goalDate);
  }

exports.showDeleteGoal = function(req,res){
  res.render("deleteGoal");
}
exports.deleteGoal = function(req,res){
  db.deleteEntry(req.body._id);
}

exports.showUpdateGoal = function(req,res){
  res.render("editGoal");
}

exports.updateGoal = function(req,res){
  db.updateEntry(req.body._id,req.body.name,req.body.type,req.body.goalValue,req.body.goalDate);
}

exports.showRegisterPage = function(req, res) {
  res.render("user/registration");
   } 
    exports.postNewUser = function(req, res) {
      const user = req.body.username;
      const password = req.body.pass;
    if (!user || !password) {
      res.send(401, 'no user or no password');
    return;
     }
     userDao.lookup(user, function(err, u) {
      if (u) {
        res.send(401, "User exists:", user);
        return;
      }
        userDao.create(user, password);
        console.log("register user", user, "password", password);
        res.redirect('/login');
      });
      } 

