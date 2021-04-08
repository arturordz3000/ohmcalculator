var errorBuilderModule = require('../modules/errorBuilderModule');

module.exports = {
    handler: (req, res, next) => {
        const { value, multiplier, tolerance } = req.query;

        if (!value || !multiplier || !tolerance) {
            res.status(400).json(errorBuilderModule.buildError('There are missing parameters.'));
        } else {
            next();
        }
    }
}