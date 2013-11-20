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
                    api.mongoose.model('Organization').findOne({name: connection.params.name}, function (err, foundOrg) {
                        //Just in case the User is updating to the same email
                        if(foundOrg && id !== foundOrg._id)
                        {
                            //Error: Duplicate organization name
                            connection.error = "An Organization with name '" + connection.params.name + "' already exists.";
                            next(connection, true);
                        }
                    });
                    res.name = connection.params.name;
                }

                res.save(function (err, org){
                    if(org)
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
