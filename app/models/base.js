const uuid = require('uuid');
const AWS = require('aws-sdk');
AWS.config.setPromisesDependency(require('bluebird'));
const dynamoDB = new AWS.DynamoDB.DocumentClient();

let mapFiltersDynamo = (filters, table, softDeletes) => {
    let params = {TableName: table};

    for (const i in filters) {
        if(typeof params['ExpressionAttributeValues'] === 'undefined'){
            params['ExpressionAttributeValues'] = {};
        }
        if(typeof params['FilterExpression'] === 'undefined'){
            params['FilterExpression'] = '';
        }else{
            if(params['FilterExpression'] !== ''){
                params['FilterExpression'] += ' and ';
            }
        }
        if (typeof filters[i] === 'string') {
            params['FilterExpression'] += i + ' = :'+ i;
            params['ExpressionAttributeValues'][':'+i] = filters[i];
        }
        if (typeof filters[i] === 'object') {
            let j = 0;
            let obj = {};
            filters[i].forEach(function(value) {
                j++;
                obj[':'+i+j] = value;
            });
            params['FilterExpression'] += i +' IN ('+ Object.keys(obj).toString() +')';
            params['ExpressionAttributeValues'] = obj;
        }

    }
    return params;
};

class Base {
    constructor({
                    table = '',
                    key = 'id',
                    fields = [],
                    dateFields = [],
                    softDeletes = false
                }) {
        this.options = {
            table,
            key,
            fields,
            dateFields,
            softDeletes
        };
    }

    getDateFields() {
        const timestamp = new Date().getTime();
        let data = {};
        this.options.dateFields.forEach(d => {
            if (d !== this.options.softDeletes) {
                data[d] = timestamp;
            }
        });
        return data;
    }

    hydrate(obj) {
        const id = uuid.v4();
        let dateFields = this.getDateFields();
        return {id, ...dateFields, ...obj};
    }

    async create(obj) {
        const params = this.hydrate(obj);
        console.log(params);
        return await dynamoDB.put({
            TableName: this.options.table, Item: params,
        }).promise();
    }

    async all(filters) {
        let params = mapFiltersDynamo(filters, this.options.table, this.options.softDeletes);
        return await dynamoDB.scan(params).promise();
    }
}

module.exports = Base;