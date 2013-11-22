exports.action = {
    name: 'userCreate',
    description: 'Creates a User',
    version: 1,
    inputs: {
        required: [ 'name', 'organizationId',  'email', 'password', 'admin' ],
        optional: []
    },
    outputExample: {
        name: 'New Admin',
        email: 'new.example@example.com',
        admin: true,
        organizations: ['527d0d8ab04e690200000002'],
        id: '5287d29d96b09e0200000005'
    },
    run: function (api, connection, next) {
        var id = api.mongoose.Types.ObjectId(connection.params.organizationId);
        var User = api.mongoose.model('User');

        //encrypt password using bcrypt
        var bcrypt = require('bcrypt');
        var hashedPass = bcrypt.hashSync(connection.params.password, 10);

        new User({
            name: connection.params.name,
            email: connection.params.email,
            password: hashedPass,
            admin: (connection.params.admin === "true") ? true : false,
            organizations: [connection.params.organizationId]
        }).save(function (err, user) {
            if(err)
            {
                connection.error = "A User with email '" + connection.params.email + "'already exists.";
                connection.response.details = err;
            }
            else if(user)
            {
                connection.response.name = user.name;
                connection.response.email = user.email;
                connection.response.admin = user.admin;
                connection.response.organizations = user.organizations;
                connection.response.id = user._id;
            }
            next(connection, true);
        });
    }
};
