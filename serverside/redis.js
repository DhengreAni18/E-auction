var redis = require('redis');
var bluebird = require("bluebird");

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

var redis_client = bluebird.promisifyAll(redis.createClient({
    host: '127.0.0.1',
    no_ready_check: true,
    auth_pass:'HighRush#@!1'
}));



redis_client.on('connect', function () {
    console.log('Redis client connected');
    //console.log(getMD5Hash('admin123'));    
});

redis_client.on('error', function (err) {
    console.log('Something went wrong ' + err);
});

module.exports = {redis_client,redis};