//I have to implement error handling for both Operational and programming errors and also for
// uncaught excxeptions - unknown regular errors

const SpecialError = require("../Utils/specialError");

//and for unhandled rejections - This are unknown errors from async functions

const handleCastErrorDB = (error) => {
    const message = `Invalid ${error.path} : ${error.value}`
    // console.log(new AppError(message, 404))
    return new SpecialError(message, 404)
};

const handleDuplicateFieldsDB = (error) => {
    const value = Object.values(error.keyValue)[0]
    console.log(value)
    const message = `Duplicate field value ${value}, This question already exists`
    return new SpecialError(message, 400)
}

const handleValidationErrorDB = (error) => {
    const errors = Object.values(error.errors).map(each => each.message)
    const message = `Invalid Input Error. ${errors.join(`. `)}`
    console.log(message)
    return new SpecialError(message, 400)
}









const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    });
};
const sendErrorProd = (err, res) => {
    // Operational, trusted error: send message to client
    if (err.isOperational) {
        console.log(err.status, err.message)
        res.status(err.statusCode).json({

            status: err.status,
            message: err.message
        });

        // Programming or other unknown error: don't leak error details
    } else {
        // 1) Log error
        console.error('ERROR 💥', err);

        // 2) Send generic message
        res.status(500).json({
            status: 'error',
            message: 'Something went very wrong!'
        });
    }
};



module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'production') {
        // console.log(err.message, 75)
        let error = {
            ...err
        };
        error.message = err.message;
        // console.log(error.message, err.message, 80)
        if (err.name === 'CastError') error = handleCastErrorDB(err);
        if (err.code === 11000) error = handleDuplicateFieldsDB(err);
        if (err.name === 'ValidationError') error = handleValidationErrorDB(err);


        sendErrorProd(error, res);

    } else if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res)
    }
}