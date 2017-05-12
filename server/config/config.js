var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    developement: {
        db: 'mongodb://localhost/multivision',
        rootPath: rootPath,
        port: process.env.PORRT || 3030
    },
    production: {
        db: 'mongodb://mani:123456@ds137801.mlab.com:37801/meanwebapp',
        rootPath: rootPath,
        port: process.env.PORRT || 3030
    }
};