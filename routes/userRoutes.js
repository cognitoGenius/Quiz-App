const express = require(`express`);

const authController = require('../controllers/authController')

const {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
} = require(`./../controllers/userController`)

const router = express.Router();

// router.post('/signup', authController.signUp);// These will be implemented later
// router.post('/login', authController.login); //These will be implemented later too


// router.post('/forgotPassword', authController.forgotPassword); //Will be implemented later
// router.patch('/resetPassword', authController.resetPassword);


router.route(`/`).get(getAllUsers).post(createUser)

router.route(`/:id`).patch(updateUser).delete(deleteUser)

module.exports = router;