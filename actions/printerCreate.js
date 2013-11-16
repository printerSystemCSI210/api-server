exports.action = {
    name: 'printerCreate',
    description: 'Creates a Printer',
    version: 1,
    inputs: {
        required: [ 'name', 'organizationId' ],
        optional: [ 'location', 'manufacturer', 'model', 'ipAddress', 'serial' ]
    },
    outputExample: {},
    run: function (api, connection, next) {
        var id = api.mongoose.Types.ObjectId(connection.params.organizationId);
        var Printer = api.mongoose.model('Printer');

        var newPrinter = new Printer({
            name: connection.params.name,
            location: connection.params.location,
            manufacturer: connection.params.manufacturer,
            model: connection.params.model,
            ipAddress: connection.params.ipAddress,
            serial: connection.params.serial
        }).save(function (err, printer) {
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
            api.mongoose.model('Organization').findByIdAndUpdate(id, {
                $push: {
                    printers: printer._id
                }
            }, function (err) {
                next(connection, true);
            });
        });
    }
};
