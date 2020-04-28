module.exports = (success, message, data, statusCode = 200) => {
    return {
        statusCode,
        body: JSON.stringify(
            {
                estado: success,
                mensaje: message,
                data
            },
            null,
            2
        ),
    }
};