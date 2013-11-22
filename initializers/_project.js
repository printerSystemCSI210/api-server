exports._project = function(api, next){

  var mongoose = require('mongoose');

  var uri = process.env.MONGOLAB_URI
      || 'mongodb://localhost/forest';


  var orgSchema = {
      name: {type: String, unique: true},
      printers: [ mongoose.Schema.Types.ObjectId ],
      public: Boolean
  };

  var printerSchema = {
      name: String,
      location: String,
      ipAddress: {type: String, unique: true},
      serial: String,
      statuses: [ {
        timeStamp: Date,
        status: String,
        pageCount: Number,
        consumables: [ {
          name: String,
          level: Number,
          capacity: Number,
          percentage: Number
        } ],
        trays: [ {
          name: String,
          xdim: Number,
          ydim: Number,
          capacity: Number
        } ]
      } ],
      manufacturer: String,
      model: String
  };

  var userSchema = {
      name: String,
      email: {type: String, unique: true},
      password: String,
      admin: Boolean,
      organizations: [ mongoose.Schema.Types.ObjectId ]
  };

  var appSchema = {
      name: String,
      description: String,
      user: mongoose.Schema.Types.ObjectId,
      key: String
  }

  mongoose.connect(uri);

  mongoose.model('Organization', orgSchema);
  mongoose.model('Printer', printerSchema);
  mongoose.model('User', userSchema);
  mongoose.model('App', appSchema);

  api.mongoose = mongoose;
  api.ObjectId = mongoose.Types.ObjectId;

  // this will prevent heroku from sleeping
  // Load the home page of the API every 45 minutes
  setInterval(function () {
    http.get('https://forest-api.herokuapp.com/', function (res) {
      console.log('Home page loaded');
    });
  }, 45 * 60 * 1000);

  next();
};
