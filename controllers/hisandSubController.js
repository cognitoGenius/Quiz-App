const catchAsync = require('./../Utils/catchAsync')

const User = require('../models/userModel');
const Result = require('./../models/resultModel');

exports.getUserTestHistory = catchAsync(async (req, res, next) => {

    // const userTestHistory = await User.find ---- I need to get the user by an Id which may be their id
    //or email and from there get their result array from their Model and send that array to the front end

    res.status(200).json({
        status: success,
        //    data: results -- The data sent back will be the array of results of the logged in user
    })
});


exports.submitTest = catchAsync(async (req, res, next) => {
    //I need to get the result object from the request body that will be sent from the client
    //Then I need to find the particular user and send the result into the result array in their user schema
    response.status(200).json('Your Test has been submitted successfully')

});