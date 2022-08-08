const express = require('express');
const authController = require('../controllers/authController');
const {
    getAllQuestions,
    // createQuestion,
    // updateQuestion,
    // deleteQuestion
} = require('../controllers/questionControllers');
const submission = require('../controllers/submissionController');

const router = express.Router();

router.route(`/`).get(authController.protect, getAllQuestions).post(authController.protect, submission)

module.exports = router;