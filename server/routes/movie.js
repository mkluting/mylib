module.exports = function(app, checkIfAuthenticated) {

    /** MOVIES API */

    /** Get Movie Model */
    let Movie = require('../models/movie');

    /**
     * Get All Movies
     */
    app.route('/api/movies').get(checkIfAuthenticated,(req,res) => {
        let data = Movie.getAll(function(data){
            res.send(data);
        });
    });

    /**
     * Get Movie by ID
     */
    app.route('/api/movies/:id').get(checkIfAuthenticated,(req, res) => {
        let movieId = req.params['id'];
        let data = Movie.get(movieId, function(data) {
            res.send(data);
        });
    });

    /**
     * Create New Movie
     */
    app.route('/api/movies').post(checkIfAuthenticated,(req, res) => {
        let movie = {
            title: req.body.title,
            director: req.body.director,
            type: req.body.type,
            series: req.body.series,
            series_num: req.body.series_num,
            owner: req.body.owner
        };
        Movie.create(movie, function(data) {
            res.status(201).send(data);
        });
    });

    /**
     * Update Movie By ID
     */
    app.route('/api/movies/:id').put(checkIfAuthenticated,(req, res) => {
        const id = req.params['id'];
        let movie = {
            title: req.body.title,
            director: req.body.director,
            type: req.body.type,
            series: req.body.series,
            series_num: req.body.series_num,
            owner: req.body.owner
        };
        Movie.update(id, movie, function(data) {
            res.status(200).send(data);
        });
    });

    /**
     * Delete Movie By ID
     */
    app.route('/api/movies/:id').delete(checkIfAuthenticated,(req, res) => {
        const id = req.params['id'];
        Movie.delete(id, function(data) {
            res.status(204).send();
        });
    });
};
