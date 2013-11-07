exports.action = {
    name: 'organizationList',
    description: 'Returns an array of Organizations',
    version: 1,
    inputs: {
        required: [],
        optional: []
    },
    outputExample: {
        organizations: [
            {
                name: 'Small Town City Hall',
                id: '123'
            },
            {
                name: 'Big Paper Company',
                id: '456'
            }
        ]
    },
    run: function (api, connection, next) {
        api.mongoose.model('Organization').find().exec(function (err, res) {
            connection.response.organizations = [];
            if (res) {
                res.forEach(function (r) {
                    connection.response.organizations.push({
                        name: r.name,
                        id: r._id
                    });
                });
            }
            next(connection, true);
        });
    }
};
