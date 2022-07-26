const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({
    path: `./config.env`
});

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

app.listen(port, () => {
    console.log(`listening at port ${port}`)
});