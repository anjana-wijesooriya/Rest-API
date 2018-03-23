var sqlite3 = require('sqlite3').verbose();
var port = process.env.PORT || 8080;
var db = new sqlite3.Database('db/chinook.db');

db.serialize(function () {
    db.run("CREATE TABLE IF NOT EXISTS counts(key TEXT, value INTEGER)");
    //db.run("INSERT INTO counts (key, value) VALUES (?, ?)", "counter", 0);
});

var express = require('express');
var restapi = express();
var educationDao = require('./dao/EducationDao.js');
var dashboardDao = require('./dao/DashboardDao.js');
var skillsDao = require('./dao/SkillsDao.js');
var experienceDao = require('./dao/ExperienceDao.js');


restapi.use(express.static(__dirname + '/public'));

restapi.use(function (request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

restapi.get('/', function (request, response, next) {
    db.all("SELECT * FROM employees", function (error, rows) {
        return response.json(rows);
    });
});

restapi.use("/education", educationDao);
restapi.use("/dashboard", dashboardDao);
restapi.use("/skill", skillsDao);
restapi.use("/experience", experienceDao);


restapi.listen(port, function () {
    console.log('Our app is running on http://localhost:' + port);
});
