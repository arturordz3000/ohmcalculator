const calculatorModule = require('../modules/calculatorModule');
var assert = require('assert')

describe('Calculator Module', function() {

    it('should return correct ohm values based band colors when result is ohms', function() {
        let valueBands = 5;
        let multiplierBand = 100;
        let toleranceBand = 1;

        let result = calculatorModule.calculateOhms(valueBands, multiplierBand, toleranceBand);
        assert.strictEqual(result, '500 Ohms 1%');

        valueBands = 21;
        multiplierBand = 10;
        toleranceBand = 2;

        result = calculatorModule.calculateOhms(valueBands, multiplierBand, toleranceBand);
        assert.strictEqual(result, '210 Ohms 2%');
    });

    it('should return correct ohm values based band colors when result is kilo ohms', function() {
        let valueBands = 5;
        let multiplierBand = 100000;
        let toleranceBand = 1;

        let result = calculatorModule.calculateOhms(valueBands, multiplierBand, toleranceBand);
        assert.strictEqual(result, '500k Ohms 1%');

        valueBands = 21;
        multiplierBand = 1000;
        toleranceBand = 2;

        result = calculatorModule.calculateOhms(valueBands, multiplierBand, toleranceBand);
        assert.strictEqual(result, '21k Ohms 2%');
    });

    it('should return correct ohm values based band colors when result is mega ohms', function() {
        let valueBands = 5;
        let multiplierBand = 1e6;
        let toleranceBand = 1;

        let result = calculatorModule.calculateOhms(valueBands, multiplierBand, toleranceBand);
        assert.strictEqual(result, '5M Ohms 1%');

        valueBands = 21;
        multiplierBand = 10 * 1e6;
        toleranceBand = 2;

        result = calculatorModule.calculateOhms(valueBands, multiplierBand, toleranceBand);
        assert.strictEqual(result, '210M Ohms 2%');
    });

    it('should return correct ohm values based band colors when result is giga ohms', function() {
        let valueBands = 5;
        let multiplierBand = 1e9;
        let toleranceBand = 1;

        let result = calculatorModule.calculateOhms(valueBands, multiplierBand, toleranceBand);
        assert.strictEqual(result, '5G Ohms 1%');

        valueBands = 21;
        multiplierBand = 100 * 1e6;
        toleranceBand = 2;

        result = calculatorModule.calculateOhms(valueBands, multiplierBand, toleranceBand);
        assert.strictEqual(result, '2.1G Ohms 2%');
    });

});