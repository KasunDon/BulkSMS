var express = require('express');

var router = express.Router(),
    RedisClient = require('../models/storage/redis'),
    Contacts = require('../models/contacts');

var redis = new RedisClient();
var contacts = new Contacts(redis);

/* GET home page. */
router.get('/', function(req, res, next) {
    contacts.getContacts(function(contacts) {
        res.render('index', {
            title: 'Bulk-SMS Management Interface',
            contacts: contacts
        });
    });
});

router.get('/get-contacts', function(req, res, next) {
    contacts.getContacts(function(contacts) {
        res.json(contacts);
    });
});

router.post('/add-to-queue', function (req, res, next) {
  var metadata = {status: 'pending', queued: Date.now(), sentOn: null};
  redis.client.set("sms-queue", JSON.stringify({data: JSON.parse(req.body.data), metadata: metadata}));
  res.send();
});

router.get('/fetch-queue', function(req, res, next){
  redis.get("sms-queue", function (err, values) {
    redis.client.del("sms-queue");
      res.json(JSON.parse(values));
  });
});

router.post('/push-contacts', function(req, res, next) {
    if (typeof req.body.contacts == "undefined") {
        res.send("API Error :: Unknown POST Request", 500);
    }

    var data = new Buffer(req.body.contacts, 'base64'); // Ta-da

    redis.set("contacts", data.toString());
    res.send();
});

module.exports = router;
