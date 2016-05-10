var redis = require('redis');

var Redis = function() {
    this.client.on('error', function(err) {
        console.log('Redis Error ' + err);
    });
};

Redis.prototype.client = redis.createClient();

Redis.prototype.set = function(key, value) {
    this.client.set(key, value, redis.print);
};

Redis.prototype.get = function(key, callback) {
    this.client.get(key, callback);
};

Redis.prototype.close = function() {
    this.client.quit();
};

module.exports = Redis;
