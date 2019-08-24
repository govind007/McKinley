const router = require('express').Router();
const { user } = require('../controllers');
const { authorizeLogin } = require('../helpers/authorization');

module.exports = (app) => {
    router.post('/signin', authorizeLogin, user.signIn);
    app.use('/', router);
};
