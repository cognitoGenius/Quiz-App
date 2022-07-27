const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({
    path: `./config.env`
});


//Handling uncaught exceptions
process.on('uncaughtException', error => {
    // console.log(error.name, error.message, '🤦‍♂️')
    process.exit(1)
})


const app = require('./app')

const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);



//Connecting to the database
mongoose.connect(DB, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => {
    console.log(`connection successful`)
})


const port = process.env.PORT || 7000;

const server = app.listen(port, () => {
    console.log(`listening at port ${port}`)
});


//Globally handling unhandled rejections
process.on('unhandledRejection', error => {
    // console.log(error.name, error.message)
    server.close(() => {
        //The code '1' passed into the method below indicates an uncaught exception
        process.exit(1)
    })
})