var express = require('express');
var router = express.Router();
var crypto = require('crypto');
/* GET home page. */
function checkSignature(query){
  var sig = query.signature;
  
  var timestamp = query.timestamp;
  var nonce = query.nonce;
  var arry = ["wohnb",timestamp,nonce];
  arry.sort();
  var content = arry[0]+arry[1]+arry[2];
  var shasum = crypto.createHash('sha1');
  shasum.update(content);
  return sig == shasum.digest('hex');
}
router.get('/', function(req, res, next) {
  var query = req.query;
  if(!checkSignature(query))
  {
    res.end(query.echostr);
  }
  console.log(query);
  
});
module.exports = router;
