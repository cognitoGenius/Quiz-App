//I have to implement error handling for both Operational and programming errors and also for
// uncaught excxeptions - unknown regular errors
//and for unhandled rejections - This are unknown errors from async functions

const SpecialError = require("../Utils/specialError");


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



const handleJWTError = () => new AppError('Invalid token, Please login again', 401);

const handleJWTExpiredError = () => new AppError('Your Token has expired, Please login again', 401)

//Function to send error to me during development
const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    });
};

//Function to send limited error to client during production
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
            message: 'Something went very wrong!',
            data: err
        });
    }
};


//Express error handler for handling errors during development and production
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
        if (error.name === 'JsonWebTokenError') err = handleJWTError();
        if (error.name === 'TokenExpiredError') err = handleJWTExpiredError();


        sendErrorProd(error, res);

    } else if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res)
    }
}