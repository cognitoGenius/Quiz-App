const {
    promisify
} = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const SpecialError = require('./../Utils/specialError');
const catchAsync = require('./../Utils/catchAsync');
const sendEmail = require('./../Utils/email');


const signToken = id => jwt.sign({
    id
}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
});

exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        firstName: req.body.firstName,
        middleName: req.body.middleName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        passwordChangedAt: req.body.passwordChangedAt,
    })

    const token = signToken(newUser._id);

    res.status(201).json({
        status: 'success',
        token,
        data: {
            user: newUser
        }
    })
});


exports.login = catchAsync(async (req, res, next) => {
    //First check if the email and password were input properly
    const {
        email,
        password
    } = req.body;
    if (!email || !password) return next(new SpecialError('Please enter email and password', 400))
    //Check if user exists with those details
    const user = await User.findOne({
        email
    }).select('+password');
    // console.log(user)

    if (!user || !(await user.correctPassword(password, user.password))) return next(new SpecialError('email or password incorrect', 401))
    const token = signToken(user._id);

    res.status(200).json({
        status: 'success',
        token
    })
});



exports.protect = catchAsync(async (req, res, next) => {
    //1.Checking and Getting the token if it is in the request header
    let token = '';
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(` `)[1]
    }

    console.log(token);
    if (!token) {
        return next(new SpecialError('You are not logged in. Please log in to get access.', 401))
    }
    //2. Verify the token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    console.log(decoded)
    //3. Check if the user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
        return next(new SpecialError('This User no longer exists'))
    }

    //4. Check if user changed password after the token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next(new SpecialError('Password has been changed, Please log in with the new password', 401))
    }

    //Grant access to the protected route
    req.user = currentUser; //Add the current user to the request object as it may become useful later.
    next()
});

//I am thinking of removing user roles from this project

// exports.restrictTo = (...roles) => {
//     //Closure in play here
//     return (req, res, next) => {
//         console.log(req.user.role, roles, req.user)
//         if (!roles.includes(req.user.role)) {
//             return next(new SpecialError('You do not have permission to perform this action', 401));
//         }
//         next()
//     }

// };


exports.forgotPassword = catchAsync(async (req, res, next) => {
    //Obtain the user by the email
    const user = await User.findOne({
        email: req.body.email
    });
    if (!user) return next(new SpecialError('There is no user with that email', 404))

    //Generate random token to be sent back to user
    const resetToken = user.createPasswordResetToken();
    await user.save({
        validateModifiedOnly: true
    })


    //send the token to the user's email after creating the reset URL
    const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`;

    const message = `Forgot your password, go to ${resetURL}
    to reset your password. If you did not forget your password, ignore this email `
    try {
        await sendEmail({
            email: user.email,
            subject: 'Your password email token (valid for 5 mins)',
            message
        });

        res.status(200).json({
            status: 'success',
            message: 'Reset Token successfully sent'
        })
    } catch (error) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({
            validateModifiedOnly: true
        })
        return next(new SpecialError('There was an error sending the email, Try again', 500));
    }
});


exports.resetPassword = catchAsync(async (req, res, next) => {

});