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

var Movie = {};

Movie.create = function(newMovie, cb){
    sql.query('INSERT INTO movies (title, director, type, series, series_num, owner) VALUES (?, ?, ?, ?, ?, ?)', [newMovie.title, newMovie.director, newMovie.type, newMovie.series, newMovie.series_num, newMovie.owner], function(err, res) {
        if(err) throw err;
        cb(res);
    });
}

Movie.update = function(id, book, cb) {
    sql.query('UPDATE books SET title = ?, author_first = ?, author_last = ?, format = ?, series = ?, series_num = ?, owner = ?, isbn_13 = ?, isbn_10 = ? WHERE id = ?', [book.title, book.author_first, book.author_last, book.format, book.series, book.series_num, book.owner, book.isbn_13, book.isbn_10, id], function(err, res) {
        if(err) throw err;
        cb(res);
    });
}

Movie.delete = function(id, cb) {
    sql.query('DELETE FROM books WHERE id = ?', id, function(err, res) {
        if(err) throw err;
        cb(res);
    });
}

Movie.getAll = function(cb, params) {
    let query = 'SELECT * FROM movies order by director asc, series asc, series_num asc';
    sql.query(query, function(err, res) {
        if(err) {
            throw err;
        }
        else {
            cb(res);
        }
    });
}

Movie.get = function(id, cb) {
    sql.query('SELECT * FROM movies WHERE id = ?', id, function(err, res) {
        if(err) throw err;
        cb(res);
    });
}

module.exports = Movie;
