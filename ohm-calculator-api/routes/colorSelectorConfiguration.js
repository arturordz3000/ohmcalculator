var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var dbServiceModule = require('../modules/dbServiceModule');
var methodNotAllowedHandler = require('../handlers/methodNotAllowedHandler');

var dbService = null;

if (process.env.NODE_ENV === 'test') {
    var db = new sqlite3.Database('test.db');
    dbService = dbServiceModule.init(db);
} else {
    dbService = dbServiceModule.init();
}

const handleError = (err, next) => {
    if (err) {
        next(err);
    }
}

router.get('/', (req, res, next) => {
    let colors = {};
    let configurations = {};
    let relationships = {};

    const colorsCallback = (err, _colors) => {
        handleError(err, next);

        colors = _colors.reduce((accumulator, current) => {
            accumulator[current.color_id] = {color_id: current.color_id, rgb: current.rgb, value: { description: current.value_description, number: current.value_number }};
            
            return accumulator;
        }, {});

        dbService.query('SELECT * from ColorSelectorConfigurations', colorSelectorConfigurationsCallback);
    }

    const colorSelectorConfigurationsCallback = (err, _configurations) => {
        handleError(err, next);

        configurations = _configurations;
        dbService.query('SELECT * from ColorSelectorConfigurations_Colors', colorSelectorConfigurations_ColorsCallback);
    }

    const colorSelectorConfigurations_ColorsCallback = (err, _relationships) => {
        handleError(err, next);

        relationships = _relationships.reduce((accumulator, current) => {
            if (!accumulator[current.color_selector_configuration_id]) {
                accumulator[current.color_selector_configuration_id] = [];
            }
            accumulator[current.color_selector_configuration_id].push(colors[current.color_id]);

            return accumulator;
        }, {});
        
        mergeAndRespond();
    }

    const mergeAndRespond = () => {
        const result = [];

        for (const configuration of configurations) {
            result.push({name: configuration.name, colors: relationships[configuration.color_selector_configuration_id]});
        }

        res.json(result);
    }

    dbService.query('SELECT * from Colors', colorsCallback);
});

router.all('/', methodNotAllowedHandler.handle);

module.exports = router;