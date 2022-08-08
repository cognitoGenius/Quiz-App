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
            type: String,
            unique: true,
            required: [true, 'add an option']
        }
    }],
    randomQueryNumber: {
        type: Number
    },
    //I need to fund out how I can create a custom property on one of the fields in my schema. 
    //That will help me selct which option is correct -- I solved this by using the correctAnswer field
})





//Creates a model
const Question = mongoose.model(`Question`, questionSchema)


module.exports = Question;