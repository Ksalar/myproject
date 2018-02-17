var express = require('express');
var bodyParser = require('body-parser');
var request = require('request')
var app = express();
var save = require('./database.js').save;
var updateInfo = require('./database.js').updateInfo;

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json())

let getMap = (name, cb) => {
  var name = name.split(' ').join('+')
  let options = {
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${name}&key=AIzaSyC6NuLoLUtvMxfo6t_r5W1KUVQeX7QKGpY`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token AIzaSyC6NuLoLUtvMxfo6t_r5W1KUVQeX7QKGpY`
    }
  }
  request(options, function(err, res, body) {
    cb(body)
  })
};



app.post('/search', function(req, res) {
  getMap(req.body.userInput, function(data) {
    console.log("in server data: ", data)
    save(data, function(dataBack) {

    res.send(dataBack)
    })
  })
})

app.post('/info', function(req, res) {
  var address = req.body.curAddress;
  var info = req.body.info;
  console.log('Here is from server address and info: ',address, info)
  updateInfo(address, info);
  res.send();
})

app.listen(3000, function() {
  console.log('listening on port 3000!');
});