exports.action = {
    name: 'statusCreate',
    description: 'Creates a Status',
    version: 1,
    inputs: {
        required: [ 'printerId' ],
        optional: [ 'status', 'pageCount', 'tonerLevel' ]
    },
    outputExample: {},
    run: function (api, connection, next) {
        var id = connection.params.printerId;
        
        api.mongoose.model('Printer').findByIdAndUpdate(id, {
            $push: {
                statuses: {
                    status: connection.params.status,
                    pageCount: connection.params.pageCount,
                    tonerLevel: connection.params.tonerLevel,
                    timeStamp: new Date()
                }
            }
        }, function (err) {
            next(connection, true);
        });
    }
};
