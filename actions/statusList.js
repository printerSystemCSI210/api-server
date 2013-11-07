exports.action = {
    name: 'statusList',
    description: 'Returns status reports from the specified printer',
    version: 1,
    inputs: {
        required: [ 'printerId' ],
        optional: [ 'start', 'end' ]
    },
    outputExample: {
        "statuses": [
            {
                timeStamp: "2013-11-07T16:33:33.446Z",
                _id: "527bc0dde77a9d78cd000004",
                pageCount: 1000,
                tonerLevel: 0.8
            }
        ]
    },
    run: function (api, connection, next) {
        
        // create the ID
        var id = api.mongoose.Types.ObjectId(connection.params.printerId);
        
        // make the query
        api.mongoose.model('Printer')
            .findOne({ _id: id })
            .exec(function (err, res) {
                if (res) {
                    
                    connection.response.statuses = res.statuses;

                    next(connection, true);
                } else {
                    next(connection, true);
                }
            }
        );
    }
};
