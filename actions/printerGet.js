exports.action = {
    name: 'printerGet',
    description: 'Returns a Printer',
    version: 1,
    inputs: {
        required: [ 'printerId' ],
        optional: [ ]
    },
    outputExample: {
        name: 'My Color Printer',
        id: '123',
        location: 'Room 201',
        manufacturer: 'Ricoh',
        model: 'ABC123',
        ipAddress: '192.168.100.20',
        serial: '12345ABCDE',
        status: {
            timeStamp: "2013-11-07T16:33:33.446Z",
            pageCount: 1000,
            message: 'Ready',
            consumables: [
                {
                    name: "Black Cartridge",
                    level: 12000,
                    capacity: 24000,
                    percentage: 0.5
                }
            ],
            trays: [
                {
                    name: "Tray 1",
                    xdim: 8.5,
                    ydim: 11,
                    capacity: 500
                }
            ]
        }
    },
    run: function (api, connection, next) {
        
        // create the ID
        var id = api.mongoose.Types.ObjectId(connection.params.printerId);
        
        // make the query
        api.mongoose.model('Printer')
            .findOne({ _id: id })
            .exec(function (err, res) {
                if (res) {
                    connection.response.name = res.name;
                    connection.response.id = res._id;
                    connection.response.location = res.location;
                    connection.response.manufacturer = res.manufacturer;
                    connection.response.model = res.model;
                    connection.response.ipAddress = res.ipAddress;
                    connection.response.serial = res.serial;
                    connection.response.status = res.status;
                    next(connection, true);
                } else {
                    next(connection, true);
                }
            }
        );
    }
};
