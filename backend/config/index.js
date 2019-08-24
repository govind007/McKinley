const path = require('path');
const root = path.join(__dirname, '../');

const env = 'live';

module.exports = {
    db: 'mongodb://localhost:27017/mckinley',
    port: 5000,
    root,
    env,
};
