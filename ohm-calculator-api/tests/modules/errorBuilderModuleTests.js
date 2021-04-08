var errorBuilderModule = require('../../modules/errorBuilderModule');
var assert = require('assert');

describe('Error builder module', () => {
    it('should return object with error property and a message', () => {
        const result = errorBuilderModule.buildError('Some message');
        assert(result);
        assert.strictEqual(result.error, 'Some message');
    });
});