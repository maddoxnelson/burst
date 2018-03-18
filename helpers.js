const fs = require('fs');

exports.moment = require('moment');

exports.dump = (obj) => JSON.stringify(obj, null, 2);

// Some details about the site
exports.siteName = `Burst`;
