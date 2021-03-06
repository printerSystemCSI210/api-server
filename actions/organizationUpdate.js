exports.action = {
    name: 'organizationUpdate',
    description: 'Updates the properties of an Organization',
    version: 1,
    inputs: {
        required: [ 'organizationId' ],
        optional: [ 'name' ]
    },
    outputExample: {
        name: 'Large Town City Hall',
        id: '123'
    },
    run: function (api, connection, next) {
        
        // create the ID
        var id = api.ObjectId(connection.params.organizationId);
        
        // make the query
        api.mongoose.model('Organization').findOne({ _id: id }, function (err, res) {
            if (res) {
                
                if (connection.params.name) {
                    res.name = connection.params.name;
                }

                res.save(function (err, org){
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
            } else {
                next(connection, true);
            }
        });
    }
};
