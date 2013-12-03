exports.action = {
    name: 'statusCreate',
    description: 'Creates a Status',
    version: 1,
    inputs: {
        required: [ 'printerId' ],
        optional: [ 'status', 'pageCount', 'trays', 'consumables' ]
    },
    outputExample: {},
    run: function (api, connection, next) {
        var id = connection.params.printerId;

        var trays = new Array();
        if (connection.params.trays) {
            trays = JSON.parse(connection.params.trays);
        }

        var consumables = new Array();
        if (connection.params.consumables) {
            consumables = JSON.parse(connection.params.consumables);
        }
        
        api.mongoose.model('Printer').findByIdAndUpdate(id, {
            
            status: {
                message: connection.params.status,
                pageCount: connection.params.pageCount,
                timeStamp: new Date(),
                trays: trays,
                consumables: consumables
            },

            $push: {
                statuses: {
                    status: connection.params.status,
                    pageCount: connection.params.pageCount,
                    timeStamp: new Date(),
                    trays: trays,
                    consumables: consumables
                }
            }
        }, function (err) {
            next(connection, true);
        });
    }
};
