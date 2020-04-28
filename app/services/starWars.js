let getSchema = async schema => {
    let response = await (await fetch(`${process.env.API_URL}/api/${schema}/schema`, {method: 'GET'})).json();
    return {schema ,fields:response.required};
};

module.exports = {
    getSchema
};