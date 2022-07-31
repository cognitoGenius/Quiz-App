const express = require('express');
const morgan = require('morgan');

const authController = require('./controllers/authController');
const SpecialError = require('./Utils/specialError');
const globalErrorHandler = require('./controllers/errorController');
const userRouter = require('./routes/userRoutes');
const questionRouter = require('./routes/questionRoutes');
const historyRouter = require('./routes/historyRoutes');

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
app.use('/api/v1/questions', questionRouter) //This route has to be accessed by a currently logged in user
app.use('api/v1/testhistory', historyRouter) //This route has to be accessed by the currently logged in user




//Handling unhandled routes
app.all('*', (req, res, next) => {
    next(new SpecialError(`This route ${req.originalUrl} has not been defined`, 404))
})


//Express comes with a built in error handling middleware. A middle ware that takes 4 arguments is treated as one
// app.use((err, req, res, next) => {
//     next(new SpecialError(`This route ${req.originalUrl} has not been defined`, 404))
// });

app.use(globalErrorHandler)


module.exports = app;