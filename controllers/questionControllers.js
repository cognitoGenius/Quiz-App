const catchAsync = require('./../Utils/catchAsync')
const Questions = require('./../models/questionModel');
const SpecialError = require('../Utils/specialError');


exports.getTestQuestions = catchAsync(async (req, res, next) => {
    // console.log(req.body.examDetails);
    const instructions = {};
    instructions['subjects'] = req.body.examDetails['subjects'];
    instructions['mode'] = req.body.examDetails['mode'];
    // console.log(instructions)
    if (!req.body.examDetails) {
        return next(new SpecialError('Test details are needed', 400))
    }
    const completeTestQuestions = [];
    for (let each of req.body.examDetails.subjects) {
        const testQuestions = await Questions.aggregate([{
                $match: {
                    subject: {
                        $eq: each
                    }
                }
            },
            {
                $sample: {
                    size: 3
                }
            }
        ])

        completeTestQuestions.push(testQuestions)
    }
    console.log("This req was successful")

    res.status(200).json({
        status: 'success',
        instructions,
        data: completeTestQuestions
    })
});


exports.createQuestion = catchAsync(async (req, res, next) => {
    const newQuestion = await Questions.create({
        subject: req.body.subject,
        question: req.body.question,
        answers: req.body.answers
    });

    res.status(201).json({
        status: 'success',
        newQuestion
    })
})














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