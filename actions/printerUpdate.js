exports.action = {
    name: 'printerUpdate',
    description: 'Updates the properties of a Printer',
    version: 1,
    inputs: {
        required: [ 'printerId' ],
        optional: [ 'name', 'location', 'manufacturer', 'model', 'ipAddress', 'serial' ]
    },
    outputExample: {
        name: 'My Color Printer',
        id: '123',
        location: 'Different Room',
        manufacturer: 'Ricoh',
        model: 'ABC123',
        ipAddress: '192.168.100.20',
        serial: '12345ABCDE'
    },
    run: function (api, connection, next) {
        
        // create the ID
        var id = api.ObjectId(connection.params.printerId);
        
        // make the query
        api.mongoose.model('Printer').findOne({ _id: id }, function (err, res) {
            if (res) {
                
                if (connection.params.name) {
                    res.name = connection.params.name;
                } 
                
                if (connection.params.location) {
                    res.location = connection.params.location;
                } 
                
                if (connection.params.manufacturer) {
                    res.manufacturer = connection.params.manufacturer;
                } 
                
                if (connection.params.model) {
                    res.model = connection.params.model;
                } 
                
                if (connection.params.ipAddress) {
                    res.ipAddress = connection.params.ipAddress;
                }

                if (connection.params.serial) {
                    res.serial = connection.params.serial;
                }

                res.save(function (err, printer){
                    if(printer)
                    {
                        connection.response.name = printer.name;
                        connection.response.location = printer.location;
                        connection.response.manufacturer = printer.manufacturer;
                        connection.response.model = printer.model;
                        connection.response.ipAddress = printer.ipAddress;
                        connection.response.serial = printer.serial;
                        connection.response.id = printer._id;
                    }
                    next(connection, true);
                });
            } else {
                next(connection, true);
            }
        });
    }
};
