const express = require('express');
const authController = require('../controllers/authController');
const {
    getTestQuestions,
    createQuestion,
    startTest,
    // updateQuestion,
    // deleteQuestion
} = require('../controllers/questionControllers');
const submission = require('../controllers/submissionController');

const router = express.Router();

router.post('/addQuestion', createQuestion);

router.use(authController.protect);

router.post('/start-test', getTestQuestions)
router.post(`/`, submission)

module.exports = router;