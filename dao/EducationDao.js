var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db/chinook.db');

router.get('/get', function (request, response, next) {
    db.all("SELECT * FROM education", function (error, rows) {
        console.log(error)
        return response.json(rows);
    });
});

module.exports = router;




