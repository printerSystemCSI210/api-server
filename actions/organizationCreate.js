exports.action = {
    name: 'organizationCreate',
    description: 'Creates an organization',
    version: 1,
    inputs: {
        required: [ 'name' ],
        optional: []
    },
    outputExample: {},
    run: function (api, connection, next) {
        var Organization = api.mongoose.model('Organization');
        new Organization({
            name: connection.params.name
        }).save(function (err) {
            next(connection, true);
        });
    }
};