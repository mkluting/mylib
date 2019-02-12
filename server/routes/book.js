module.exports = function(app, checkIfAuthenticated) {

    /** BOOKS API */

    /** Get Book Model */
    let Book = require('../models/book');

    /**
     *  Get All Books
     */
    app.route('/api/books').get(checkIfAuthenticated, (req,res) => {
        let data = Book.getAll(function(data){
            res.send(data);
        });
    });

    /**
     *  Get Book By ID
     */
    app.route('/api/books/:id').get(checkIfAuthenticated, (req, res) => {
        let bookId = req.params['id'];
        let data = Book.get(bookId, function(data) {
            res.send(data);
        });
    });

    /**
     * Create New Book
     */
    app.route('/api/books').post(checkIfAuthenticated, (req, res) => {
        let book = {
            title: req.body.title,
            author_first: req.body.author_first,
            author_last: req.body.author_last,
            format: req.body.format,
            series: req.body.series,
            series_num: req.body.series_num,
            isbn_13: req.body.isbn_13,
            isbn_10: req.body.isbn_10,
            owner: req.body.owner 
        };
        Book.create(book, function(data) {
            res.status(201).send(data);
        });
    });

    /**
     * Update Book By ID
     */
    app.route('/api/books/:id').put(checkIfAuthenticated,(req, res) => {
        const id = req.params['id'];
        let book = {
            title: req.body.title,
            author_first: req.body.author_first,
            author_last: req.body.author_last,
            format: req.body.format,
            series: req.body.series,
            series_num: req.body.series_num,
            isbn_13: req.body.isbn_13,
            isbn_10: req.body.isbn_10,
            owner: req.body.owner
        };
        Book.update(id, book, function(data) {
            res.status(200).send(data);
        });
    });

    /**
     * Delete Book By ID
     */
    app.route('/api/books/:id').delete(checkIfAuthenticated,(req, res) => {
        const id = req.params['id'];
        Book.delete(id, function(data) {
            res.status(204).send();
        });
    });
};
