exports.action = {
    name: 'organizationCreate',
    description: 'Creates an organization',
    version: 1,
    inputs: {
        required: [ 'name' ],
        optional: []
    },
    outputExample: {
        name: 'Small Town City Hall',
        id: '123'
    },
    run: function (api, connection, next) {
        var Organization = api.mongoose.model('Organization');

        new Organization({
            name: connection.params.name
        }).save(function (err, org) {
            if(err)
            {
                connection.error = "An Organization with name '" + connection.params.name + "' already exists.";
                connection.response.details = err;
            }
            else if(org)
            {
                connection.response.name = org.name;
                connection.response.id = org._id;
            }
            next(connection, true);
        });
    }
};
