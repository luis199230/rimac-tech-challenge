const api = require('../services/starWars');

const Schema = require('../models/schema');

module.exports = {
    listCharacters: async event => {

        return render(true, 'Listado de personajes de StarWars', '');
    },
    createSchemas: async event => {
        const schemas = ['people', 'vehicles', 'films', 'planets', 'species', 'starships'];

        let fields = await Schema.all({entity:schemas});
        if(fields.Count === 0){
            let fields = await Promise.all(schemas.map(schema => api.getSchema(schema)));
            await Promise.all(fields.map(async r => {
                for (const field of r.fields) {
                    await Schema.create({entity: r.schema, field});
                }
            }));
        }else{
            fields = fields.Items;
        }
        return render(true, 'Listado de campos de los esquemas en el API StarWars', fields);
    }
};