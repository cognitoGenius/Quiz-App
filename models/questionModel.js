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
        required: [true, `There must be a valid question`],
        // unique: true,
    },
    answers: [{
        ans1: {
            option: {
                type: String,
                required: [true, 'Input an option']
            },
            correct: {
                type: Boolean,
                required: [true, 'Indicate if this option is correct or not']
            },
        },
        ans2: {
            option: {
                type: String,
                required: [true, 'Input an option']
            },
            correct: {
                type: Boolean,
                required: [true, 'Indicate if this option is correct or not']
            },
        },
        ans3: {
            option: {
                type: String,
                required: [true, 'Input an option']
            },
            correct: {
                type: Boolean,
                required: [true, 'Indicate if this option is correct or not']
            },
        },
        ans4: {
            option: {
                type: String,
                required: [true, 'Input an option']
            },
            correct: {
                type: Boolean,
                required: [true, 'Indicate if this option is correct or not']
            },
        }
    }]
})


//Creates a model
const Question = mongoose.model(`Question`, questionSchema)


module.exports = Question;