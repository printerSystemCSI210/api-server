exports.action = {
    name: 'userDelete',
    description: 'Deletes a User',
    version: 1,
    inputs: {
        required: [ 'userId', 'organizationId' ],
        optional: []
    },
    outputExample: {},
    run: function (api, connection, next) {
        
        var user_id = api.ObjectId( connection.params.userId );
        var org_id = api.ObjectId( connection.params.organizationId );

        api.mongoose.model('Organization').findOne({
            _id: org_id
        }).exec(function (err, org) {
            if (org && org.users) {
                var new_user_list = [];

                for (var i = 0; i < org.users.length; i++) {
                    if (org.users[i].toString() !== user_id.toString()) {
                        new_user_list.push(org.users[i]);
                    }
                }

                api.mongoose.model('Organization').update({
                    _id: org_id
                }, {
                    users: new_user_list
                }, function (err) {

                    api.mongoose.model('User').remove({
                        _id: user_id
                    }, function (err) {
                        next(connection, true);
                    });

                });

            } else {
                next(connection, true);
            }
        });
    }
};
