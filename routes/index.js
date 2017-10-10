var express = require('express');
var crypto = require('crypto');
var xml2json = require('xml2js');
var router = express.Router();

/* GET home page. */
function checkSignature(query){
  if(query.echostr == null) return false;
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
  if(checkSignature(query))
  {
    res.end(query.echostr);
  }
});
router.post('/', function(req, res, next) {
  var query = req.query;
  req.rawBody = '';
  req.on('data',function(data){
    req.rawBody += data;
  });
  req.on('end',function(){
    var parser = new xml2json.Parser();
    console.log(parser.parseString(req.rawBody) );
    res.end('ff');
  });
});
module.exports = router;
