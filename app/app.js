'use strict';

require('./config');
const startWarsController = require('./controllers/starWars');

module.exports = {
    createSchemas: startWarsController.createSchemas,
    listSchema: startWarsController.listSchema
};
