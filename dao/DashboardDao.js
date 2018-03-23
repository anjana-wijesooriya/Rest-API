var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db/chinook.db');

router.get('/getAchievements', function (request, response, next) {
    try {
        var script = 'SELECT A.id, A.title, A.class, A.value, B.iconname FROM achievement A INNER JOIN icons B ON A.iconid = B.id ORDER BY A.id DESC';
        db.all(script, function (error, rows) {
            if (error != null) console.log(error);
            return response.json(rows);
        });
    } catch (error) {
        console.log(error);
    }
});

router.get('/getSkills', function (request, response, next) {
    try {
        script = 'SELECT A.[percentage], A.[theme], A.[title], B.[iconname] FROM [highlights_skills] A INNER JOIN [icons] B ON A.[iconid] = B.[id] ORDER BY A.[id] DESC';
        db.all(script, function (error, rows) {
            if (error != null) console.log(error);
            return response.json(rows);
        })
    } catch (error) {
        console.log(error);
    }
})

router.get('/getTechs', function (request, response, next) {
    try {
        script = 'SELECT * FROM highlights_techs';
        db.all(script, function (error, rows) {
            if (error != null) console.log(error);
            return response.json(rows);
        });
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;