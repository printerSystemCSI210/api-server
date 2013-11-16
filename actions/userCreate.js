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
            admin: (connection.params.admin === "true") ? true : false
        }).save(function (err, user) {
            api.mongoose.model('User').findByIdAndUpdate(user._id, {
                $push: {
                    organizations: id
                }
	        }, function (err, user) {
                if(user)
                {
                    connection.response.name = user.name;
                    connection.response.email = user.email;
                    connection.response.admin = user.admin;
                    connection.response.organizations = user.organizations;
                    connection.response.id = user._id;
                }
	            next(connection, true);
	        });
	    });
    }
};
