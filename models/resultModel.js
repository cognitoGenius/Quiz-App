const mongoose = require('mongoose');


const resultSchema = new mongoose.Schema({
    subjectsTaken: {
        type: [String],
        required: true
    },
    totalNoOfQuestions: {
        type: Number,
        required: [true, 'We have to know how many questions the user took']
    },
    score: {
        type: Number,
        required: [true, 'We need to know the users overall correct score']
    },
    mode: {
        type: String,
        enum: ['Practice', 'Test'],
        required: [true, 'We need to know which mode the user took the test']
    },
    scorePercentage: {
        type: Number,
        //I need to use a pre hook to calculate this dynamically from the score and totalNoOfQuestions field
    },
    dateTaken: Date,
})



resultSchema.pre('save', async function (next) {
    this.scorePercentage = Math.round((this.score / this.totalNoOfQuestions) * 100); //Look up how to reduce the result of a calculation to 2 decimal places
    next();
})

const Result = mongoose.model('Result', resultSchema)

module.exports = resultSchema;