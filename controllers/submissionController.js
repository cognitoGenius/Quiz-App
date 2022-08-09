const catchAsync = require('../Utils/catchAsync')

const User = require('../models/userModel');

module.exports = catchAsync(async (req, res, next) => {
    //Get the logged in user by id
    const user = await User.findById(req.user.id)

    //Check that the user's history doc does not contain more than 20 documents.
    if (user) {
        if (user.resultHistory.length > 20) {
            user.resultHistory[user.resultHistory.length - 1].remove();
            await user.save({
                validateModifiedOnly: true
            });
        }

        //Add the most recent submission
        user.resultHistory.unshift(req.body.resultHistory);

        //Update the number of tests taken
        user.testsTaken = user.testsTaken + 1;

        //Update the highest test score
        if (req.body.resultHistory.scorePercent > user.highestTestPercent || !user.highestTestPercent) {
            user.highestTestPercent = req.body.resultHistory.scorePercent;
        }

        //save document and run validators on the modified fields
        await user.save({
            validateModifiedOnly: true
        });
    }

    //Send back a response about a successful submission
    res.status(200).json({
        status: "successful",
        message: "Your test has been submitted successfully"
    });
});