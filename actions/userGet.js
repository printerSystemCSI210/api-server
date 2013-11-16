exports.action = {
    name: 'userGet',
    description: 'Returns a User',
    version: 1,
    inputs: {
        required: [ 'userId' ],
        optional: []
    },
    outputExample: {
        name: 'Example Admin',
        email: 'example@example.com',
        admin: true,
        organizations: ['527d0d8ab04e690200000002'],
        id: '5287d29d96b09e0200000005'
    },
    run: function (api, connection, next) {
        // create the ID
        var id = api.mongoose.Types.ObjectId(connection.params.userId);
        
        api.mongoose.model('User').findOne({ _id: id}).exec(function (err, res) {
            
            if (res != null) {
                connection.response.name = res.name;
                connection.response.email = res.email;
                connection.response.admin = res.admin;
                connection.response.id = res._id;
            }
            
            next(connection, true);
        });
    }
};
