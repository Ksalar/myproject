const mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1/database';
mongoose.connect(mongoDB);
var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var shopSchema = mongoose.Schema({
  address: {type: String, unique: true},
  lng: Number,
  lat: Number,
  info: String

});

let Shop = mongoose.model('Shop', shopSchema);


let lookFor = (selector, query, cb) => {
  console.log("looking for")
  Shop.find({"info": /Starbucks/}, function(err, data) {
    cb(data)
  })
}

let save = (item, cb) => {
  item = JSON.parse(item);
  Shop.find({"address": item.results[0].formatted_address}, function(err, data) {
    if (data.length !== 0) {
      cb(data)
    } else {
      let obj = {
        address: item.results[0].formatted_address,
        lng: item.results[0].geometry.location.lng,
        lat: item.results[0].geometry.location.lat,
        info: "Sample of data"
      }
      Shop.create(obj, function(err, extra) {
      })
      cb(data)
    }
  })
}

let updateInfo = (address, info) => {
  Shop.findOne({"address": address}, function(err, doc) {
    if (err) {
    } else {
      doc.info = info;
      doc.save(()=>{})
    }
  })

}






module.exports.lookFor = lookFor;
module.exports.save = save;
module.exports.updateInfo = updateInfo;









