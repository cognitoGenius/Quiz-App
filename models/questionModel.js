const mongoose = require(`mongoose`);

//Describe a schema and some validation
const questionSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: [true, `Each Question must be assigned a subject`], //This is called a validator
        trim: true
    },
    question: {
        type: String,
        unique: true,
        required: [true, `There must be a valid question`],
    },
    answers: [{
        ans1: {
            option: String,
            correct: Boolean,
        },
        ans2: {
            option: String,
            correct: Boolean,
        },
        ans3: {
            option: String,
            correct: Boolean,
        },
        ans4: {
            option: String,
            correct: Boolean,
        }
    }],
    randomQueryNumber: {
        type: Number
    },

})


//Creates a model
const Question = mongoose.model(`Question`, questionSchema)


module.exports = Question;