var moment = require("moment");
var crypto = require('crypto');

function getMD5Hash(input) {
    return crypto.createHash('md5').update(input, 'utf-8').digest('hex');
}

class TimeStampHelper {

    constructor() {        
    }

    getCurrentTimeStamp(format) {
        switch (format) {

            case 'unix':
                {
                    return moment().unix();
                }

            default: {
                return moment().format('YYYY-MM-DD hh:mm:ss');
            }
        }
    }
}


var timseStampHelper = new TimeStampHelper();

module.exports = { TimeStampHelper, getMD5Hash };