const express = require(`express`);

const authController = require('../controllers/authController')

const {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
} = require(`./../controllers/userController`)

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
router.patch('/updatePassword', authController.protect, authController.updatePassword);


// router.post('/forgotPassword', authController.forgotPassword); //Will be implemented later
// router.patch('/resetPassword', authController.resetPassword);


router.route(`/`).get(authController.protect, getAllUsers).post(authController.protect, createUser)

router.route(`/:id`).patch(authController.protect, updateUser).delete(authController.protect, deleteUser)

module.exports = router;