var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db/chinook.db');


router.get('/getSkills', function (request, response, next) {
    try {
        var script = 'SELECT A.[Id], A.[SkillName], A.[Value], A.[Color], B.[Id] AS "StackId", B.[Stack] FROM [Skills] A INNER JOIN [SkillType] B ON A.[SkillTypeId] = B.[Id]';
        return db.all(script, function (error, rows) {
            if (error != null) console.log(error);
            return response.json(rows);
        });
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;