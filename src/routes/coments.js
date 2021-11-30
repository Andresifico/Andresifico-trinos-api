const express = require('express');

const router = express.Router();
const { authMiddleware } = require('../middlewares/authMiddleware');

const {
  likeComents,
  deleteComentById,
} = require('../controllers/coments');

router.post('/:id/likes', authMiddleware, likeComents);
router.delete('/:id', authMiddleware, deleteComentById);

module.exports = router;
