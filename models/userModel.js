const mongoose = require(`mongoose`);
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');


//Describe a schema and some validation
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, `You need to enter your first name`], //This is called a validator
        trim: true,
        minLength: [2, 'Your firstname is too short'],
        maxLength: [25, 'Your firstname is too long']
    },
    middleName: {
        type: String,
        trim: true,
        maxLength: [25, 'The name is too long']
    },
    lastName: {
        type: String,
        required: [true, 'You need to enter your last name'],
        trim: true, //Recheck what the trim property does
        maxLength: [25, 'Your lastname is too long']
    },
    email: {
        type: String,
        required: [true, 'Provide a valid email address'],
        trim: true,
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Enter a valid email address']
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        required: [true, 'User role needs to be defined'],
        default: 'user',
    },
    password: {
        type: String,
        required: [true, 'Insert Option'],
        minLength: [8, 'Password must contain atleast 8 characters'],
        select: false,
    },
    passwordConfirm: {
        type: String,
        required: [true],
        validate: {
            validator: function (element) {
                //This only works as SAVE. That is it only works on the create or save method
                return element === this.password;
            },
            message: 'Passwords are not the same'
        },
    },
    registrationDate: {
        type: Date,
        default: Date.now()
    },

    resultHistory: [{
        subjects: {
            type: [String],
            required: [true, 'The user must have taken a test on atleast one subject'],
        },
        scorePercent: {
            type: Number,
            required: [true, 'The user must have a score']
        },
        noOfQuestions: {
            type: Number,
            required: [true, 'How many questions did the user take?']
        },
        mode: {
            type: String,
            enum: ['Practice', 'Test'],
            required: [true, 'what type of test was it?']
        },
        dateTaken: {
            type: Date,
            default: Date.now()
        },
    }],
    testsTaken: Number,
    highestTestPercent: Number,
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
})


userSchema.pre('save', async function (next) {
    //To ensure that encryption of the password is only done when there is a change in the password field.
    if (!this.isModified('password')) return next()
    //Encrypt the password
    this.password = await bcrypt.hash(this.password, 12)
    //Remove the password confirm field so as not to persist it since it has no use anymore
    this.passwordConfirm = undefined
});


userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};


userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {

    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(
            this.passwordChangedAt.getTime() / 1000,
            10
        );
        // console.log(changedTimestamp, JWTTimestamp)
        return JWTTimestamp < changedTimestamp;
    }
    // False means NOT changed
    return false;
};

userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetExpires = (Date.now() + 10 * 60 * 100);

    return resetToken;
};


//Remember to check that the user history does not exit a length of 20


//Creates a model
const User = mongoose.model(`User`, userSchema)


module.exports = User;