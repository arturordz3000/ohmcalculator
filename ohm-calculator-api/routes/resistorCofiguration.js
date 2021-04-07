var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var dbServiceModule = require('../modules/dbServiceModule');

var dbService = null;

if (process.env.NODE_ENV === 'test') {
    var db = new sqlite3.Database('../test.db');
    dbService = dbServiceModule.init(db);
} else {
    dbService = dbServiceModule.init();
}

router.get('/', function(req, res, next) {
    dbService.query('SELECT resistor_default_id, position, rgb, value_description, value_number FROM ResistorDefaults RD INNER JOIN Colors C ON RD.color_id = C.color_id',
        (err, rows) => {
            if (err) {
                next(err);
                return;
            }

            let resistorConfiguration = rows;
            
            resistorConfiguration = resistorConfiguration.map(row => {
                return {
                    rgb: row.rgb,
                    position: row.position,
                    value: {
                        description: row.value_description,
                        number: row.value_number
                    }
                }
            });

            res.json(resistorConfiguration);
        }
    );
});

module.exports = router;