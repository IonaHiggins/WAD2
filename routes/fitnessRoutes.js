const express = require("express");
const router = express.Router();
const controller = require('../controllers/fitnessController.js');

router.get('/', controller.goals_index);

router.get('/add', controller.showNewGoal);
router.post("/add",controller.addGoal);

router.get("/delete",controller.showDeleteGoal);
router.post("/delete",controller.deleteGoal);

router.get("/update",controller.showUpdateGoal);
router.post("/update",controller.updateGoal);

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