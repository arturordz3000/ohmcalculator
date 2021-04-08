var express = require('express');
var router = express.Router();
var calculatorModule = require('../modules/calculatorModule');
var methodNotAllowedHandler = require('../handlers/methodNotAllowedHandler');
var calculatorValidationHandler = require('../handlers/calculatorValidationHandler');

router.get('/', calculatorValidationHandler.handler, (req, res) => {
    const value = req.query.value;
    const multiplier = req.query.multiplier;
    const tolerance = req.query.tolerance;

    const result = calculatorModule.calculateOhms(value, multiplier, tolerance);

    res.json({result: result});
});

router.get('/:value/:multiplier/:tolerance', (req, res) => {
    const value = req.params.value;
    const multiplier = req.params.multiplier;
    const tolerance = req.params.tolerance;

    const result = calculatorModule.calculateOhms(value, multiplier, tolerance);

    res.json({result: result});
});

router.all('/', methodNotAllowedHandler.handle);
router.all('/:value/:multiplier/:tolerance', methodNotAllowedHandler.handle);

module.exports = router;