var Contacts = function(redis) {
    this.redis = redis;
};

Contacts.prototype.async = require('async');
Contacts.prototype.redisKey = "contacts";

Contacts.prototype.getContacts = function(callback) {
  var redisCallback = function (err, response) {
      var output = [];

      this.async.forEachOf(JSON.parse(response), function(value, key, inner){
          output.push({description: key, title: value});
          inner();
      });

      callback(output);
  }.bind(this);

  this.redis.get(this.redisKey, redisCallback);
};

module.exports = Contacts;
