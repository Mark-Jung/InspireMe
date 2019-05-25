var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a quote');
});

router.get('/qod', function(req, res, next) {
  let response = {
    "response": {
      "quote":"The older I get, the more that I see, my parents aren't heroes.",
      "author": "Sasha Sloan"
  }}
  res.send(response);
});

module.exports = router;
