var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db/chinook.db');

router.get('/getAchievements', function (request, response, next) {
    var script = 'SELECT A.id, A.title, A.class, A.value, B.iconname FROM achievement A INNER JOIN icons B ON A.iconid = B.id';
    db.all(script, function (error, rows) {
        return response.json(rows);
    });
});

router.get('/getSkills', function (request, response, next) {
    script = 'SELECT A.id, A.percentage, A.theme, A.title, B.iconname FROM highlights_skills A INNER JOIN icons B ON A.iconid = B.id';
    db.all(script, function (error, rows) {
        return response.json(rows);
    })
})

router.get('/getTechs', function (request, response, next) {
    script = 'SELECT * FROM highlights_techs';
    db.all(script, function (error, rows) {
        return response.json(rows);
    });
});

module.exports = router;