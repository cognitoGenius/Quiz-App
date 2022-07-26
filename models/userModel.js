const mongoose = require(`mongoose`);
const validator = require('validator');
const resultSchema = require('./resultModel')


//Describe a schema and some validation
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, `You need to enter your first name`], //This is called a validator
        trim: true,
        minLength: [2, 'Your firstname is too short'],
        maxLength: [25, 'Your firstname is too long']
    },
    middleName: {
        type: String,
        trim: true,
        maxLength: [25, 'The name is too long']
    },
    lastName: {
        type: String,
        required: [true, 'You need to enter your last name'],
        trim: true, //Recheck what the trim property does
        maxLength: [25, 'Your lastname is too long']
    },
    email: {
        type: String,
        required: [true, 'Provide a valid email address'],
        trim: true,
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Insert Option'],
        minLength: [8, 'Password must contain atleast 8 characters']
    },
    passwordConfirm: {
        type: String,
        required: [true],
        validate: {
            validator: function (element) {
                //This only works as SAVE. That is it only works on the create or save method
                return element === this.password;
            },
            message: 'Passwords are not the same'
        },
    },
    registrationDate: {
        type: Date,
        default: Date.now()
    },
    passwordChangedAt: Date,
    scoreHistory: {
        type: [resultSchema],
    },

    //There should be a field that shows the total number of tests taken and one that...
    //...stores the highest test percentage accrued by that particular user
})


//I am considering using this prehook to validate that the number of results stored is not more than the most recent 20

// userSchema.pre('save', function (next) {
//     if (this.scoreHistory.length === 20) {
//         this.scoreHistory.length.shift()
//     }
// })




//Creates a model
const User = mongoose.model(`User`, userSchema)


module.exports = User;