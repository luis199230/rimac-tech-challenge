const Base = require('./base');

const options = {
    table: process.env.SCHEMA_TABLE,
    fields: ['field', 'translated', 'entity'],
    key: 'id',
    dateFields: [
        'created_at',
        'updated_at',
        'deleted_at'
    ],
    softDeletes: 'deleted_at'
};

class Schema extends Base{
    constructor() {
        super(options);
    }
}

module.exports = new Schema();