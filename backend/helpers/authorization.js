const async = require('async');
const User = require('../models/user.model');
const { getUniqueId } = require('../helpers/tools');

const authorizeLogin = (req, res, next) => {
  const { body: { email, password } } = req;
    if (!email || !password) {
        return res.status(400).send({ message: 'Invalid params' });
    }
  User.findOne({ email })
      .then((user) => {
          if (!user) {
              return res.sendStatus(400).send({ message: 'No such user does exists' })
          }
          const tokenDetails = { id: getUniqueId() };
          async.parallel({
              comparePassword: (callback) => user.comparePassword(password, callback),
              generateToken: (callback) => user.generateToken(tokenDetails.id, user.id, callback)
          }, (err, results) => {
              if (err) {
                  return res.sendStatus(500).send({ message: 'Internal server error' });
              }
              if (!results.comparePassword) {
                  return res.send({ message: 'Invalid Password' });
              }
              tokenDetails.token = results.generateToken;
              user.token.push(tokenDetails);
              req.body.tokenDetail = tokenDetails;
              req.body.user = user;
              next();
          })
      })
};

module.exports = { authorizeLogin };
