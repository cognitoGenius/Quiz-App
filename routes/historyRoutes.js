const express = require('express');

const hisandSubController = require('../controllers/hisandSubController');

const router = express.Router()

router.route('/:id').get(hisandSubController.getUserTestHistory).post(hisandSubController.submitTest)
//I need to check how to properly implement this route



module.exports = router;