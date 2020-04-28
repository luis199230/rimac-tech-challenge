const uuid = require('uuid');
const AWS = require('aws-sdk');
AWS.config.setPromisesDependency(require('bluebird'));
const dynamoDB = new AWS.DynamoDB.DocumentClient();

let mapFiltersDynamo = (filters, table) => {
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

    formatDate() {
        let dt = new Date();
        return `${dt.getFullYear().toString().padStart(4, '0')}-${
            (dt.getMonth()+1).toString().padStart(2, '0')}-${
            dt.getDate().toString().padStart(2, '0')} ${
            dt.getHours().toString().padStart(2, '0')}:${
            dt.getMinutes().toString().padStart(2, '0')}:${
            dt.getSeconds().toString().padStart(2, '0')}`;
    }

    getDateFields() {
        const timestamp = this.formatDate();
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
        return await dynamoDB.put({
            TableName: this.options.table, Item: params,
        }).promise();
    }

    async all(filters) {
        let params = mapFiltersDynamo(filters, this.options.table);
        return await dynamoDB.scan(params).promise();
    }
}

module.exports = Base;