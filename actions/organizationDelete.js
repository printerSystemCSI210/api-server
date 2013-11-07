exports.action = {
    name: 'organizationDelete',
    description: 'Deletes an Organization',
    version: 1,
    inputs: {
        required: [ 'organizationId' ],
        optional: []
    },
    outputExample: {},
    run: function (api, connection, next) {
        var id = api.mongoose.Types.ObjectId(connection.params.organizationId);
        api.mongoose.model('Organization').remove({ _id: id }, function (err) {
            next(connection, true);
        });
    }
};
