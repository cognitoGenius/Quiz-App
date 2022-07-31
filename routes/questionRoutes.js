const express = require('express');
const authController = require('./../controllers/authController');

const {
    getAllQuestions,
    createQuestion,
    updateQuestion,
    deleteQuestion
} = require('./../controllers/questionControllers');


const router = express.Router();

router.route(`/`).get(authController.protect, authController.restrictTo('user', 'admin'), getAllQuestions).post(authController.protect, authController.restrictTo('admin'), createQuestion);

router.route(`/:id`).patch(authController.protect, authController.restrictTo('admin'), updateQuestion).delete(authController.protect, authController.restrictTo('admin'), deleteQuestion);

module.exports = router;