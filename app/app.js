'use strict';

require('./config');
const startWarsController = require('./controllers/starWars');

module.exports = {
    listSchemas: startWarsController.listSchemas,
    listCharacters: startWarsController.listCharacters
};
