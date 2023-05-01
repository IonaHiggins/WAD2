const express = require("express");
const router = express.Router();
const controller = require('../controllers/fitnessController.js');
const {login} = require('../auth/auth')
const {verify} = require('../auth/auth')

router.get('/login', controller.showLoginPage);
router.post('/login', login, controller.handleLogin);

router.get('/', controller.aboutUs);

router.get('/goals',verify,controller.goals_index);

router.get("/loggedin",verify, controller.goals_index)
router.get('/add',verify,controller.showNewGoal);
router.post("/add",controller.addGoal);

router.get("/delete",verify,controller.showDeleteGoal);
router.post("/delete",verify,controller.deleteGoal);

router.get("/update",verify,controller.showUpdateGoal);
router.post("/update",verify,controller.updateGoal);

router.get('/register',verify, controller.showRegisterPage);
router.post('/register', verify,controller.postNewUser);

router.get('/login', controller.showLoginPage);


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