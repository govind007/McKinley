const _ = require('lodash');
const ObjectId = require('mongoose').Types.ObjectId;

exports.getResponseStatus = (err, result) => {
    return (err) ? {status: 500, message: 'Error in server'} : {status: 200, message: _.isString(result) ? { message: result } : result};
};

exports.getUniqueId = () => ObjectId().toString();
