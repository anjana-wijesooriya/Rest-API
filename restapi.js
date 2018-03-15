var sqlite3 = require('sqlite3').verbose();
var port = process.env.PORT || 8080;
var db = new sqlite3.Database('db/chinook.db');

db.serialize(function () {
    db.run("CREATE TABLE IF NOT EXISTS counts(key TEXT, value INTEGER)");
    //db.run("INSERT INTO counts (key, value) VALUES (?, ?)", "counter", 0);
});

var express = require('express');
var restapi = express();


restapi.use(express.static(__dirname + '/public'));


restapi.get('/data', function (request, response) {
    db.all("SELECT * FROM counts", function (error, rows) {
        return response.json(rows);
    });
});

restapi.get('/', function (request, response) {
    db.all("SELECT * FROM employees", function (error, rows) {
        return response.json(rows);
    });
});

restapi.listen(port, function () {
    console.log('Our app is running on http://localhost:' + port);
});
