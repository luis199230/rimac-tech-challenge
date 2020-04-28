let getSchema = async schema => {
    let response = await (await fetch(`${process.env.API_URL}/api/${schema}/schema`, {method: 'GET'})).json();
    return {schema ,fields:response.required};
};

let getData = async (schema) => {
    let response = await (await fetch(`${process.env.API_URL}/api/${schema}`, {method: 'GET'})).json();
    return response.results;
};


module.exports = {
    getSchema,
    getData
};