const catchAsync = require('../Utils/catchAsync')

const User = require('../models/userModel');

module.exports = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user.id)
    if (user) {
        if (user.resultHistory.length === 20) {
            await User.findByIdAndDelete(user.resultHistory[length - 1])
        }
    }
    //I need to get the result object from the request body that will be sent from the client
    //Then I need to find the particular user and send the result into the result array in their user schema
    response.status(200).json('Your Test has been submitted successfully')

});