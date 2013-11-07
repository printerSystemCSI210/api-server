exports.action = {
    name: 'printerDelete',
    description: 'Deletes a Printer',
    version: 1,
    inputs: {
        required: [ 'printerId', 'organizationId' ],
        optional: []
    },
    outputExample: {},
    run: function (api, connection, next) {
        
        var printer_id = api.ObjectId( connection.params.printerId );
        var org_id = api.ObjectId( connection.params.organizationId );

        api.mongoose.model('Organization').findOne({
            _id: org_id
        }).exec(function (err, org) {
            if (org && org.printers) {
                var new_printer_list = [];

                for (var i = 0; i < org.printers.length; i++) {
                    if (org.printers[i].toString() !== printer_id.toString()) {
                        new_printer_list.push(org.printers[i]);
                    }
                }

                api.mongoose.model('Organization').update({
                    _id: org_id
                }, {
                    printers: new_printer_list
                }, function (err) {

                    api.mongoose.model('Printer').remove({
                        _id: printer_id
                    }, function (err) {
                        next(connection, true);
                    });

                });

            } else {
                next(connection, true);
            }
        });
    }
};
