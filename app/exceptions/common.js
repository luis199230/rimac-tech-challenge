class Common extends Error {

    constructor(name, message) {
        super(message);
        this.name = name;
        Error.captureStackTrace(this, Common);
    }
}
module.exports = Common;