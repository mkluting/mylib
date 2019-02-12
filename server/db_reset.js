let data = {
    tables: {
        books: [
            {id: 1, title: 'Ex-Heroes', author_first: 'Peter', author_last: 'Clines', format: 'Paperback', series: 'Ex-Heroes', series_num: 1, owner: 'Matt'},
            {id: 2, title: 'Ex-Patriots', author_first: 'Peter', author_last: 'Clines', format: 'Paperback', series: 'Ex-Heroes', series_num: 2, owner: 'Matt'},
            {id: 3, title: 'Ex-Communication', author_first: 'Peter', author_last: 'Clines', format: 'Paperback', series: 'Ex-Heroes', series_num: 3, owner: 'Matt'},
            {id: 4, title: 'Ex-Purgatory', author_first: 'Peter', author_last: 'Clines', format: 'Paperback', series: 'Ex-Heroes', series_num: 4, owner: 'Matt'},
            {id: 5, title: 'Ex-Isle', author_first: 'Peter', author_last: 'Clines', format: 'Paperback', series: 'Ex-Heroes', series_num: 5, owner: 'Matt'},
        ],
    },
}

var db = require('./db');
db.connect(db.MODE_PRODUCTION, function() {
    db.fixtures(data, function(err) {
        if(err){
            return console.log(err);
            process.exit(1);
        }
        console.log("Data has been reloaded");
        process.exit(1);
    })
});
