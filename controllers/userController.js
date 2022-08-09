const catchAsync = require('./../Utils/catchAsync')
const User = require(`./../models/userModel`);
const SpecialError = require('../Utils/specialError');

//To restrict certain update fields
const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(el => {
        if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
};


exports.getUser = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user.id)
    if (!user) {
        return next(new SpecialError('Your account does not exist', 400))
    }

    res.status(200).json({
        status: `success`,
        data: {
            user
        }
    })
});

exports.getUserHistory = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    const history = user.resultHistory;
    if (!user) {
        return next(new SpecialError('Cannot find user', 400))
    }
    res.status(200).json({
        status: 'success',
        data: history
    })
});

exports.updateUser = catchAsync(async (req, res, next) => {
    if (req.body.password || req.body.passwordConfirm) {
        return next(new SpecialError('You cannot update your password via this route', 400))
    }
    const allowedObjects = filterObj(req.body, 'firstName', 'mmiddleName', 'lastName', 'email');

    const updatedUser = await User.findByIdAndUpdate(req.user.id, allowedObjects, {
        new: true,
        runValidators: true
    })

    res.status(200).json({
        status: `success`,
        data: {
            updatedUser
        }
    })
});


//Implementation Paused - Still thinking about totally deleting the user or making the account inactive
exports.deleteUser = catchAsync(async (req, res, next) => {

    res.status(500).json({
        status: `error`,
        message: `This route is not yet implemented`
    })
});











// exports.getAllUsers = catchAsync(async (req, res, next) => {
//     const users = await User.find();

//     res.status(200).json({
//         status: `success`,
//         results: users.length,
//         data: {
//             users
//         }
//     });
// });





// exports.createUser = catchAsync(async (req, res, error) => {



//     res.status(500).json({
//         status: `error`,
//         message: `This route is not yet defined`
//     })
// });