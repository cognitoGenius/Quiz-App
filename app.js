const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors')
const SpecialError = require('./Utils/specialError');
const globalErrorHandler = require('./controllers/errorController');
const userRouter = require('./routes/userRoutes');
const testRouter = require('./routes/testRoutes');

const app = express();

//Setting security headers
app.use(helmet()); //Recheck why it has to be called
app.use(cors());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

//Limit Requests from the same IP
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!'
}); //Why were some options excluded - chechk docs

app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({
    limit: '10kb'
}));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Preventing parameter pollution
// app.use(
//     hpp({
//         whitelist: []
//     })
// );


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