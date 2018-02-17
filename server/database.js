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

let save = (item, cb) => {
  item = JSON.parse(item);
  Shop.find({"address": item.results[0].formatted_address}, function(err, data) {
    if (data.length !== 0) {
      console.log("data is exist", data)
      cb(data)
    } else {
      let obj = {
        address: item.results[0].formatted_address,
        lng: item.results[0].geometry.location.lng,
        lat: item.results[0].geometry.location.lat,
        info: "Sample of data"
      }
      console.log("-------------------", obj)
      Shop.create(obj, function(err, extra) {
        console.log("Created new data!")
      })
      cb(data)
    }
  })
}

let updateInfo = (address, info) => {
  // address = JSON.parse(address);
  // info = JSON.parse(info);
  console.log("!!!!!!!!!!!!!!!from database: ", address, info)
  Shop.update(
    {"address":address},
    { $push: {"info": info}}
  )
}






module.exports.save = save;
module.exports.updateInfo = updateInfo;









