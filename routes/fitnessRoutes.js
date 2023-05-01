const express = require("express");
const router = express.Router();
const controller = require('../controllers/fitnessController.js');
const {login} = require('../auth/auth')

router.post('/login', login, controller.handleLogin);

router.get('/', controller.goals_index);

router.get('/add', controller.showNewGoal);
router.post("/add",controller.addGoal);

router.get("/delete",controller.showDeleteGoal);
router.post("/delete",controller.deleteGoal);

router.get("/update",controller.showUpdateGoal);
router.post("/update",controller.updateGoal);

router.get('/register', controller.showRegisterPage);
router.post('/register', controller.postNewUser);

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