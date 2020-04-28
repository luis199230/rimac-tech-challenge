const uuid = require('uuid');
const Base = require('./base');

class Schema extends Base{
    constructor(params) {
        super(params);
    }
    getItem(){
        return {
            id: this.item.id,
            field: this.item.field,
            type: this.item.type
        }
    }
}

module.exports = Schema;