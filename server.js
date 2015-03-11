var express = require('express')
  , app = express()
  , db = require('monk')('localhost:27017/nodetest1')
  , bodyParser = require('body-parser')
  , dotenv = require('dotenv').load()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

// ROUTES
app.get('/', function(req, res) {
  res.sendfile('index.html')
})

app.post('/api/store', function(req, res) {
  if (req.body.api_key === process.env.API_KEY) {
    delete req.body.api_key
    var store = db.get('store')
    store.insert(req.body)
    res.json(req.body)
  } else {
    res.send(401, 'unauthorized')
  }

})

app.get('/store',function(req,res){
  var collection = db.get('store');
  collection.find({},{limit:20},function(e,docs){
    res.json(docs);
  })
})

// START SERVER
app.listen(1337, function() {
  console.log('Server running on port 1337')
})
