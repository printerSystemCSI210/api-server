exports.action = {
    name: 'organizationDelete',
    description: 'Deletes an Organization and all associated Printers',
    version: 1,
    inputs: {
        required: [ 'organizationId' ],
        optional: []
    },
    outputExample: {},
    run: function (api, connection, next) {

        var id = api.mongoose.Types.ObjectId(connection.params.organizationId);
        
        api.mongoose.model('Organization')
            .findOne({ _id: id })
            .populate({ path: 'printers', model: 'Printer' })
            .exec(function (err, org) {
                if (org) {

                    if (org.printers) {
                        for (var i = 0; i < org.printers.length; i++) {
                            org.printers[i].remove();
                        }
                    }

                    org.remove();

                }
                next(connection, true);
            }
        );
    }
};
