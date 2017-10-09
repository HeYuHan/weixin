var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var sig = req.signature;
  var echo = req.echostr;
  var timestamp = req.timestamp;
  var nonce = req.nonce;
  console.log(req.query);
  res.end(echo);
});
module.exports = router;
