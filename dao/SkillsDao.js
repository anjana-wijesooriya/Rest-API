var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db/chinook.db');


router.get('/getSkills', function (request, response, next) {
    var script = 'SELECT A.[Id], A.[SkillName], A.[Value], A.[Color], B.[Id] AS "StackId", B.[Stack] FROM [Skills] A INNER JOIN [SkillType] B ON A.[SkillTypeId] = B.[Id]';
    return db.all(script, function (error, rows) {
        return response.json(rows);
    });
});

module.exports = router;