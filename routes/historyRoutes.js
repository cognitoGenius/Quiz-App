const express = require('express');

const authController = require('./../controllers/authController');
const hisandSubController = require('../controllers/hisandSubController');

const router = express.Router();

router.route('/:id').get(hisandSubController.getUserTestHistory).post(authController.protect, hisandSubController.submitTest)
//I need to check how to properly implement this route



module.exports = router;