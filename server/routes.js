module.exports = function(app, db) {

    const expressJwt = require('express-jwt');
    const fs = require('fs');
    const jwt = require('jsonwebtoken');

    const RSA_PUBLIC_KEY = fs.readFileSync('./keys/public.key');
    const RSA_PRIVATE_KEY = fs.readFileSync('./keys/private.key');

    let checkIfAuthenticated = expressJwt({
        secret: RSA_PUBLIC_KEY
    });

    app.route('/ping').get((req, res) => {
        res.status(200).json({
            success: true,
            status: 'Api Running'
        });
    });

    require('./routes/book')(app, checkIfAuthenticated);
    require('./routes/movie')(app, checkIfAuthenticated);
    require('./routes/user')(app, checkIfAuthenticated);

    /** Authentication **/
    app.route('/api/account/login')
        .post(loginRoute);

    app.route('/api/account/create')
        .post(createRoute);

    function loginRoute(req, res){
        const username = req.body.username;
            //password = req.body.password;

        if(validateEmailAndPassword(username)){
            const userId = findUserIdForEmail(username);

            const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
                algorithm: 'RS256',
                expiresIn: 3600,
                subject: userId
            });

            res.status(200).json({
                idToken: jwtBearerToken,
                expiresIn: 3600
            });
        }
        else {
            res.sendStatus(401);
        }

    }

    function createRoute(req, res){
        const email = req.body.username;
            //password = req.body.password;

        let userCreated = createUser(username);
        if(userCreated.created == true) {
            const userId = userCreated.user_id;

            const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
                algorithm: 'RS256',
                expiresIn: 3600,
                subject: userId
            });

            res.status(200).json({
                created: true,
                idToken: jwtBearerToken,
                expiresIn: 120
            });
        } else {
            res.status(200).json({
                created: false,
                message: userCreated.message
            })
        }

        // send to db (find or create)
        // return created true or false
        // if false, return message stating either already exists or error
    }

    function createUser(username) {
        // create user in db


        // Success Example
        return { created: true, user_id: '1' };

        // Already created example
        //return { created: false, message: 'User already exists' };
    }

    function validateEmailAndPassword(email, password) {
        // check db
        return true;
    }

    function findUserIdForEmail(email) {
        // check db
        return '1';
    }

};
