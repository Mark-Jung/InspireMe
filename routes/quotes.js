var express = require('express');
var router = express.Router();
var parser = require('../utils/parser');
const mongoose = require('mongoose');

const Quotes = mongoose.model('Quotes');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a quote');
});

router.post('/', function(req, res, next) {
  var expected = ['text', 'author', 'pic'];
  if (!parser.checkBody(req.body, expected)) {
    res.status(400);
    res.send({ "error": "Request Body is insufficient" })
  }
  
  const { text, author, pic } = req.body;
  Quotes.findOne({ text: text }).then((existingQuote)=> {
    if (existingQuote) {
      res.status(400);
      res.send({ "error": "Already exists" });
    } else {
      Quotes.count({}, function(err, count) {
        let newQuote = new Quotes({ 
          text,
          author,
          pic,
          count: count + 1,
        }).save().then(()=> {
          res.status(201);
          res.send({"response": "Successfully created Quote object."});
        });
      });
    }
  });
});

router.get('/qod', function(req, res, next) {
  let response = {
    "response": {
      "quote":"The older I get, the more that I see, my parents aren't heroes.",
      "author": "Sasha Sloan"
    }
  }
  res.send(response);
});


module.exports = router;
