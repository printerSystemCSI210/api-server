exports.action = {
    name: 'printerList',
    description: 'Returns an array of Printers from an Organization',
    version: 1,
    inputs: {
        required: [ 'organizationId' ],
        optional: []
    },
    outputExample: {
        printers: [
            {
                name: 'My Color Printer',
                id: '123',
                location: 'Room 201',
                manufacturer: 'Ricoh',
                model: 'ABC123',
                ipAddress: '192.168.100.20',
                serial: '12345ABCDE'
            }
        ]
    },
    run: function (api, connection, next) {
        var id = api.mongoose.Types.ObjectId(connection.params.organizationId);
        api.mongoose.model('Organization')
            .findOne({ _id: id })
            .populate({ path: 'printers', model: 'Printer' })
            .exec(function (err, res) {

                connection.response.printers = [];
                if (res && res.printers) {
                    res.printers.forEach(function (r) {
                        connection.response.printers.push({
                            name: r.name,
                            id: r._id,
                            location: r.location,
                            manufacturer: r.manufacturer,
                            model: r.model,
                            ipAddress: r.ipAddress,
                            serial: r.serial
                        });
                    });
                }
                next(connection, true);
            }
        );
    }
};
