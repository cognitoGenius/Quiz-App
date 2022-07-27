const User = require('./../models/userModel');
const SpecialError = require('./../Utils/specialError')
const catchAsync = require('./../Utils/catchAsync')
const jwt = require('jsonwebtoken');


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
        passwordChangeAt: req.body.passwordChangeAt,
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