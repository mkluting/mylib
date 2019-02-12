let db = require('./db');

db.connect(db.MODE_PRODUCTION, function() {
  db.drop(['books'], function(err) {
        if(err) {
            return console.log(err);
            process.exit(1);
        }
        console.log('Cleared DB');
        process.exit(1);
  });
});

