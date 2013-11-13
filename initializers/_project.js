exports._project = function(api, next){

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
      email: String,
      password: String,
      admin: Boolean
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

  next();
};
