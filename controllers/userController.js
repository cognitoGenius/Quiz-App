//Will be implemented only if there is admin access
const catchAsync = require('./../Utils/catchAsync')
const User = require(`./../models/userModel`);
//Use the aggregation pipeline to implement the restricted ability to get the most active users and also...
//..The ability to get the users who have performed best in their last 20 or less tests

exports.getAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        status: `success`,
        results: users.length,
        data: {
            users
        }
    });
});


exports.createUser = catchAsync(async (req, res, error) => {



    res.status(500).json({
        status: `error`,
        message: `This route is not yet defined`
    })
});


exports.getUser = catchAsync(async (req, res, next) => {

    //Remember to implement a not found error for a scenario where the user does not exist
    res.status(500).json({
        status: `error`,
        message: `This route is not yet defined`
    })
});

exports.updateUser = catchAsync(async (req, res, next) => {
    res.status(500).json({
        status: `error`,
        message: `This route is not yet defined`
    })
});

exports.deleteUser = catchAsync(async (req, res, next) => {

    res.status(500).json({
        status: `error`,
        message: `This route is not yet defined`
    })
});