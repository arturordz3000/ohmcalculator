var errorBuilderModule = require('../modules/errorBuilderModule');

module.exports = {
    handle: (req, res) => {
        res.status(404).send(errorBuilderModule.buildError(`A route for the URL ${req.originalUrl} could not be found.`));
    }
}