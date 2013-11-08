exports.action = {
    name: 'userUpdate',
    description: 'Updates the properties of a User',
    version: 1,
    inputs: {
        required: [ 'userId' ],
        optional: [ 'name', 'email', 'password', 'admin' ]
    },
    outputExample: {},
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
                    res.password = connection.params.password;
                }

                //Some check may be needed to ensure any user can't change admin status
                if (connection.params.admin) {
                    res.admin = connection.params.admin;
                }

                res.save();
                
                next(connection, true);
            } else {
                next(connection, true);
            }
        });
    }
};