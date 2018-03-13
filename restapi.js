var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db/chinook.db');

db.serialize(function () {
    db.run("CREATE TABLE IF NOT EXISTS counts(key TEXT, value INTEGER)");
   // db.run("INSERT INTO counts (key, value) VALUES (?, ?)", "counter", 0);
});

var express = require('express');
var restapi = express();

restapi.get('/data', function (request, response) {
    db.all("SELECT * FROM counts", function (error, rows) {
        return response.json(rows);
    });
});

restapi.listen(8080);

