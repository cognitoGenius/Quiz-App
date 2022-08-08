const catchAsync = require('./../Utils/catchAsync')
const Question = require('./../models/questionModel');
const SpecialError = require('../Utils/specialError');


exports.getAllQuestions = catchAsync(async (req, res, next) => {
    const questions = await Question.find();
    console.log("This req was successful")

    res.status(200).json({
        status: 'success',
        data: questions
    })
});




















//Thinking of keeping this real simple and removing admin access, any modification and addition can be...
//..done from the backend by myself.


// exports.createQuestion = catchAsync(async (req, res, next) => {
//     const lastQuestion = await Question.find()
//     // console.log(lastQuestion.length, req.body)
//     req.body.randomQueryNumber = lastQuestion.length
//     // console.log(lastQuestion.length, req.body)
//     const newTestQuestion = await Question.create(req.body);

//     res.status(201).json({
//         status: "success",
//         data: newTestQuestion
//     });
// })


// exports.updateQuestion = catchAsync(async (req, res, next) => {
//     console.log("The update req is successful", req.params)
//     const updatedQuestion = await Question.findByIdAndUpdate(req.params.id, req.body, {
//         new: true,
//         runValidators: true
//     })

//     res.status(200).json({
//         status: 'success',
//         data: updatedQuestion
//     })
// })


// exports.deleteQuestion = catchAsync(async (req, res, next) => {


//     console.log("The delete req is successful", req.params)
//     const tour = await Question.findByIdAndDelete(req.params.id)
//     if (!tour) {
//         return next(new SpecialError('Question not found', 404))
//     }
//     res.status(204).json({
//         status: 'success',
//         data: null
//     })
// });