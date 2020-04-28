const api = require('../services/starWars');

const Schema = require('../models/schema');

let translate = (str) => {
    const data = require('../storage/translated.json');
    let found = '';
    for(const i in data){
        if(i === str){
            found = data[i];
        }
    }
    return found!==''?found:str;
}

let translateKeys = (data, headers) =>{
    data = data.map(d => {
        let tmp = {};
        Object.entries(d).forEach(d => {
            const pos = headers.findIndex(h => h.field === d[0]);
            if(pos !== -1){
                tmp[headers[pos].translated] = d[1];
            }else{
                tmp[d[0]] = d[1];
            }
        });
        return tmp;
    });
    return data;
};

//Possible values ['people', 'vehicles', 'films', 'planets', 'species', 'starships'];

module.exports = {
    listSchema: async event => {
        let schema = '';
        if(event.pathParameters){
            schema = event.pathParameters.schema;
        }else{
            return render(false, 'Ruta no encontrada');
        }
        let fields = await Schema.all({entity:schema});
        let data = await api.getData(schema);
        data = translateKeys(data, fields.Items);
        return render(true, 'Listado de '+schema+' de StarWars', data);
    },
    createSchemas: async event => {
        let schemas = [];
        if (event.body) {
            let body = JSON.parse(event.body);
            if (body.schemas)
                schemas = body.schemas;
        }
        let data = await Schema.all({entity:schemas});
        if(data.Count === 0){
            let fields = await Promise.all(schemas.map(schema => api.getSchema(schema)));
            await Promise.all(fields.map(async r => {
                for (const field of r.fields) {
                    await Schema.create({entity: r.schema, translated: translate(field), field });
                }
            }));
            data = await Schema.all({entity:schemas});
        }
        return render(true, 'Listado de campos de los esquemas en el API StarWars', data.Items);
    }
};