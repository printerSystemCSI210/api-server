exports.action = {
    name: 'userList',
    description: 'Returns an array of Users',
    version: 1,
    inputs: {
        required: [],
        optional: []
    },
    outputExample: {
        users: [
            {
                name: 'Example Admin',
                email: 'example@example.com',
                admin: true,
                organizations: ['456'],
                id: '123'
            },
            {
                name: 'Example Non-Admin',
                email: 'notAdmin@example.com',
                admin: false,
                organizations: ['456'],
                id: '456'
            }
        ]
    },
    run: function (api, connection, next) {
        api.mongoose.model('User').find().exec(function (err, res) {
            connection.response.users = [];
            if (res) {
                res.forEach(function (r) {
                    connection.response.users.push({
                        name: r.name,
                        email: r.email,
                        admin: r.admin,
                        id: r._id
                    });
                });
            }
            next(connection, true);
        });
    }
};
