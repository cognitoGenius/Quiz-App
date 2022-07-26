const express = require('express');

const {
    getAllQuestions,
    createQuestion,
    updateQuestion,
    deleteQuestion
} = require('./../controllers/questionControllers');


const router = express.Router();

router.route(`/`).get(getAllQuestions).post(createQuestion);

router.route(`/:id`).patch(updateQuestion).delete(deleteQuestion);

module.exports = router;