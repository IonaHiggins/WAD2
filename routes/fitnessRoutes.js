const express = require("express");
const router = express.Router();
const controller = require('../controllers/fitnessController.js');
const {login} = require('../auth/auth')
const {verify} = require('../auth/auth')

router.get('/login', controller.showLoginPage);
router.post('/login', login, controller.handleLogin);

router.get('/', controller.aboutUs);

router.get('/login', controller.showLoginPage);
router.post('/login', login, controller.handleLogin);

router.get('/register',controller.showRegisterPage);
router.post('/register', controller.postNewUser);

router.get("/loggedin",verify,controller.handleLogin);
router.get('/add',verify,controller.showNewGoal);
router.post("/add",controller.addGoal);

router.get('/lifestyle',verify,controller.showLifestyle);
router.get('/nutrition', verify, controller.showNutrition);
router.get('/fitness',verify,controller.showFitness);


router.get("/delete",verify,controller.showDeleteGoal);
router.post("/delete",verify,controller.deleteGoal);

router.get("/update",verify,controller.showUpdateGoal);
router.post("/update",verify,controller.updateGoal);

router.get('/login', controller.showLoginPage);

router.get('/posts/:author/complete',verify, controller.getCompleteUserGoals);
router.get('/posts/:author',verify,controller.getUserGoals);

router.get('/goals',verify,controller.goals_index);

router.use(function(req, res) {
    res.status(404);
    res.type('text/plain');
    res.send('404 Not found.');
    })

router.use(function(err, req, res, next) {
    res.status(500);
    res.type('text/plain');
    res.send('Internal Server Error.');
}) 
module.exports = router;