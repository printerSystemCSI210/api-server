exports.action = {
    name: 'organizationGet',
    description: 'Returns an Organization',
    version: 1,
    inputs: {
        required: [ 'organizationId' ],
        optional: []
    },
    outputExample: {
        name: 'Small Town City Hall',
        id: '123'
    },
    run: function (api, connection, next) {
        // create the ID
        var id = api.mongoose.Types.ObjectId(connection.params.organizationId);
        
        api.mongoose.model('Organization').findOne({ _id: id}).exec(function (err, res) {
            
            if (res != null) {
                connection.response.name = res.name;
                connection.response.id = res._id;
            }
            
            next(connection, true);
        });
    }
};
