module.exports = function(app, checkIfAuthenticated) {

    /** MOVIES API */

    /** Get Movie Model */
    let User = require('../models/user');

    /**
     * Get All Movies
     */
    app.route('/api/users').get((req,res) => {
        let data = User.getAll(function(data){
            res.send(data);
        });
    });
};
