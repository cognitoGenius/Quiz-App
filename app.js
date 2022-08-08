const express = require('express');
const morgan = require('morgan');

const SpecialError = require('./Utils/specialError');
const globalErrorHandler = require('./controllers/errorController');
const userRouter = require('./routes/userRoutes');
const testRouter = require('./routes/testRoutes');

const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(express.json()) //To make the body property available on the request object to facilitate post requests

app.use((req, res, next) => {
    console.log(req.headers);
    next();
})

app.use('/api/v1/users', userRouter) //This route has to be accessed by a currently logged in user
app.use('/api/v1/test', testRouter) //This route has to be accessed by a currently logged in user


//Handling unhandled routes
app.all('*', (req, res, next) => {
    next(new SpecialError(`This route ${req.originalUrl} has not been defined`, 404))
})

app.use(globalErrorHandler)

module.exports = app;