const { UserService } = require('../services');
const { getResponseStatus }  = require('../helpers/tools');

module.exports = {
    signIn: (req, res) => {
        const { body } = req;
        const service = new UserService(body);
        service.signIn((err, result) => {
            const response = getResponseStatus(err, result);
            res.status(response.status).send(response.message);
        })
    }
};
