const fetch = require('node-fetch');
const render = require('./presenters/responseJson');

global.fetch = fetch;
global.render = render;
