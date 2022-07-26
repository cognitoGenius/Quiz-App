class SpecialError extends Error {
    constructor(message, statusCode) {
        super(message)

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith(`4`) ? 'fail' : 'error';
        this.isOperational = true


        //To capture the stack trace to enable error tracing - Recheck for understanding
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = SpecialError;