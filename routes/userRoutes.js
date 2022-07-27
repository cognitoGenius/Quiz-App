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


// router.post('/forgotPassword', authController.forgotPassword); //Will be implemented later
// router.patch('/resetPassword', authController.resetPassword);


router.route(`/`).get(getAllUsers).post(createUser)

router.route(`/:id`).patch(updateUser).delete(deleteUser)

module.exports = router;