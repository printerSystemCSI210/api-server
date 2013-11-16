exports.action = {
    name: 'userDelete',
    description: 'Deletes a User',
    version: 1,
    inputs: {
        required: [ 'userId' ],
        optional: []
    },
    outputExample: {},
    run: function (api, connection, next) {
        
        var user_id = api.ObjectId( connection.params.userId );

        api.mongoose.model('User').remove({
            _id: user_id
        }, function (err) {
            next(connection, true);
        });

    }
};
