var express = require('express');
var router = express.Router();
var calculatorModule = require('../modules/calculatorModule');

function parametersValidator(value, multiplier, tolerance, res, next) {
    if (!value || !multiplier || !tolerance) {
        res.status(400).json({error: 'There are missing parameters.'});
    } else {
        next();
    }
}

router.get('/', function(req, res, next) {
    parametersValidator(req.query.value, req.query.multiplier, req.query.tolerance, res, next);
}, function(req, res, next) {
    const value = req.query.value;
    const multiplier = req.query.multiplier;
    const tolerance = req.query.tolerance;

    const result = calculatorModule.calculateOhms(value, multiplier, tolerance);

    res.json({result: result});
});

router.get('/:value/:multiplier/:tolerance', function(req, res, next) {
    parametersValidator(req.params.value, req.params.multiplier, req.params.tolerance, res, next);
}, function (req, res, next) {
    const value = req.params.value;
    const multiplier = req.params.multiplier;
    const tolerance = req.params.tolerance;

    const result = calculatorModule.calculateOhms(value, multiplier, tolerance);

    res.json({result: result});
});

module.exports = router;