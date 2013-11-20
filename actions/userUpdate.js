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
                    api.mongoose.model('User').findOne({email: connection.params.email}, function (err, foundUser) {
                        //Just in case the user is updating to the same email
                        if(foundUser && id !== foundUser._id)
                        {
                            //Error because there is a duplicate email
                            connection.error = "A User with email '" + connection.params.email + "' already exists.";
                            next(connection, true);
                        }
                        res.email = connection.params.email;
                    });
                }

                if (connection.params.password) {
                    var bcrypt = require('bcrypt');
                    var hashedPass = "";
                    bcrypt.genSalt(10, function(err, salt) {
                        bcrypt.hash(connection.params.password, salt, function(err, hash) {
                            hashedPass = hash;
                        });
                    });
                    res.password = hashedPass;
                }

                //Some check may be needed to ensure any user can't change admin status
                if (connection.params.admin) {
                    res.admin = connection.params.admin === "true" ? true : false;
                }

                res.save(function (res, user){
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
            } else {
                next(connection, true);
            }
        });
    }
};
