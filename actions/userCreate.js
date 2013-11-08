exports.action = {
    name: 'userCreate',
    description: 'Creates a User',
    version: 1,
    inputs: {
        required: [ 'name', 'organizationId',  'email', 'password', 'admin' ],
        optional: []
    },
    outputExample: {},
    run: function (api, connection, next) {
        var id = api.mongoose.Types.ObjectId(connection.params.organizationId);
        var User = api.mongoose.model('User');

        new User({
            name: connection.params.name,
            email: connection.params.email,
            password: connection.params.password,
            admin: connection.params.admin
        }).save(function (err, printer) {
            api.mongoose.model('Organization').findByIdAndUpdate(id, {
                $push: {
                    users: user._id
                }
        }, function (err) {
            next(connection, true);
        });
    }
};
