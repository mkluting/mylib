let mysql = require('mysql');
let config = require('../config');

let sql = mysql.createConnection({
    host: config.DB_HOST,
    user: config.DB_USER,
    password: config.DB_PASS,
    database: "mylibrary"
});

sql.connect(function(err) {
    if(err) console.log('error');
    if(!err) console.log('connected');
});

var User = {};

User.getAll = function(cb) {
    sql.query('SELECT username, avatar FROM users', function(err, res) {
        if(err) throw err;
        cb(res);
    });
}

module.exports = User;
