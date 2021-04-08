var errorBuilderModule = require('../modules/errorBuilderModule');

module.exports = {
    handle: (req, res) => {
        res.status(405).send(errorBuilderModule.buildError('Method Not Allowed.'));
    }
}