exports.action = {
    name: 'organizationUpdate',
    description: 'Updates the properties of an Organization',
    version: 1,
    inputs: {
        required: [ 'organizationId' ],
        optional: [ 'name' ]
    },
    outputExample: {},
    run: function (api, connection, next) {
        
        // create the ID
        var id = api.ObjectId(connection.params.organizationId);
        
        // make the query
        api.mongoose.model('Organization').findOne({ _id: id }, function (err, res) {
            if (res) {
                
                if (connection.params.name) {
                    res.name = connection.params.name;
                }

                res.save();
                
                next(connection, true);
            } else {
                next(connection, true);
            }
        });
    }
};
