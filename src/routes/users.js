const express = require('express');

const router = express.Router();

const {
  createUser,
  getUserById,
  updateUser,
  deactivateUser,
  loginUser,
  getAllUsers,
  sendEmailPassword,
  updatePassword,
  resetPasswWord,
  logOut,
} = require('../controllers/users');

const { authMiddleware } = require('../middlewares/authMiddleware');
const { paginationMiddleware } = require('../middlewares/paginationMiddleware');

router.get('/all', authMiddleware, paginationMiddleware, getAllUsers);
router.post('/', createUser);
router.post('/login', loginUser);
router.post('/send_password_reset', sendEmailPassword);
router.get('/:id', getUserById);
router.put('/:id', authMiddleware, updateUser);
router.delete('/:id', authMiddleware, deactivateUser);
router.post('/update_password', authMiddleware, updatePassword);
router.post('/reset_password', resetPasswWord);
router.post('/logout', authMiddleware, logOut);

module.exports = router;
