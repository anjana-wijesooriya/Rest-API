var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db/chinook.db');

router.get('/getExperience', function (request, response, next) {
    try {
        var script = 'SELECT A.[CareerId], A.[FromDate], A.[ToDate], A.[Basis], A.[Designation], A.[CompanyId],'
            + 'B.[CompanyName]FROM [Career] A INNER JOIN[Company] B ON A.[CompanyId] = B.[CompanyId]';
        return db.all(script, function (error, rows) {
            if (error != null) response.status(500).send({ error: error.message });
            return response.json(rows);
        });
    } catch (error) {
        if (error != null) response.status(500).send({ error: error.message });
    };
    
});

router.get('/getResponsibilitiesByCareer/:careerid', function (request, response, next) {
    try {
        var script = 'SELECT A.[Id], A.[Description]* FROM [Responsibility] A INNER JOIN [Career_Responsibility] B ON A.[Id] = B.[ResponsibilityId]'

        return db.all(script + ' WHERE B.[CareerId] = ?', [request.params.careerid], function (error, rows) {
            if (error != null) response.status(500).send({ error: error.message });
            return response.json(rows);
        });
    } catch (error) {
        response.status(500).send({ error: error });
    };
    
});

router.get('/getResponsibilities', function (request, response, next) {
    try {
        var script = 'SELECT A.[Id], A.[Description] FROM [Responsibility] A INNER JOIN [Career_Responsibility] B ON A.[Id] = B.[ResponsibilityId]'
        return db.all(script, function (error, rows) {
            if (error != null) response.status(500).send({ error: error.message });
            return response.json(rows);
        });
    } catch (error) {
        if (error != null) response.status(500).send({ error: error.message });
    };
})

router.get('/getSkillsByCareer/:careerid', function (request, response, next) {
    try {
        var script = 'SELECT A.[Id], A.[SkillName], A.[Color] FROM [Skills] A INNER JOIN [Career_Skills] B ON A.[id] = B.[SkillsId]';

        return db.all(script + ' AND B.[CareerId] = ?', [request.params.careerid], function (error, rows) {
            if (error != null) response.status(500).send({ error: error.message });
            return response.json(rows);
        });
    } catch (error) {
        if (error != null) response.status(500).send({ error: error.message });
    };
});

router.get('/getSkills', function (request, response, next) {
    try {
        var script = 'SELECT A.[Id], A.[SkillName], A.[Color] FROM [Skills] A INNER JOIN [Career_Skills] B ON A.[id] = B.[SkillsId]';

        return db.all(script ,function (error, rows) {
            if (error != null) response.status(500).send({ error: error.message });
            return response.json(rows);
        });
    } catch (error) {
        if (error != null) response.status(500).send({ error: error.message });
    };
});

module.exports = router;