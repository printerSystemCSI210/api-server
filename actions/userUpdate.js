exports.action = {
    name: 'userUpdate',
    description: 'Updates the properties of a User',
    version: 1,
    inputs: {
        required: [ 'userId' ],
        optional: [ 'name', 'email', 'password', 'admin', 'organizationId' ]
    },
    outputExample: {
        name: 'Changed Admin',
        email: 'example@example.com',
        admin: true,
        organizations: ['527d0d8ab04e690200000002'],
        id: '5287d29d96b09e0200000005'
    },
    run: function (api, connection, next) {
        
        // create the ID
        var id = api.ObjectId(connection.params.userId);
        
        // make the query
        api.mongoose.model('User').findOne({ _id: id }, function (err, res) {
            if (res) {
                
                if (connection.params.name) {
                    res.name = connection.params.name;
                }

                if (connection.params.email) {
                    res.email = connection.params.email;
                }

                if (connection.params.password) {
                    var bcrypt = require('bcrypt');
                    var hashedPass = bcrypt.hashSync(connection.params.password, 10);
                    res.password = hashedPass;
                }

                if (connection.params.admin) {
                    res.admin = connection.params.admin === "true" ? true : false;
                }

                res.save(function (err, user){
                    if(err)
                    {
                        connection.error = "A User with email '" + connection.params.email + "' already exists.";
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
            } else {
                next(connection, true);
            }
        });
    }
};
