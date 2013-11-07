exports._project = function(api, next){

  require('newrelic');

  // modify / append the api global variable
  // I will be run as part of actionHero's boot process

  var mongoose = require('mongoose');

  var uri = process.env.MONGOLAB_URI
      || 'mongodb://localhost/forest';


  var orgSchema = {
      name: String,
      printers: [ mongoose.Schema.Types.ObjectId ],
      users: [ mongoose.Schema.Types.ObjectId ],
      public: Boolean
  };

  var printerSchema = {
      name: String,
      location: String,
      ipAddress: String,
      statuses: [ mongoose.Schema.Types.ObjectId ],
      manufacturer: String,
      model: String
  };

  var userSchema = {
      name: String,
      email: String,
      password: String,
      admin: Boolean
  };

  var statusSchema = {
      timeStamp: Date,
      status: String,
      pageCount: Number,
      tonerLevel: Number
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
  mongoose.model('Status', statusSchema);
  mongoose.model('App', appSchema);

  api.mongoose = mongoose;

  next();
}