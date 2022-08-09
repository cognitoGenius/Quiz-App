const express = require(`express`);

const authController = require('../controllers/authController');

const {
    // getAllUsers,
    // createUser,
    getUserHistory,
    getUser,
    updateUser,
    deleteUser,
} = require(`./../controllers/userController`)

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.use(authController.protect);

router.delete('/closeAccount', deleteUser);
router.get('/history', getUserHistory)
router.patch('/updatePassword', authController.updatePassword);
router.route(`/profile`).get(getUser).patch(updateUser);

module.exports = router;