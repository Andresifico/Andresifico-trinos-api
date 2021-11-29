const express = require('express');

const router = express.Router();

const { authMiddleware } = require('../middlewares/authMiddleware');
const { paginationMiddleware } = require('../middlewares/paginationMiddleware');
const {
  tweetsFeed,
  likeTweet,
  tweetsFeedByUserName,
  createComment,
  createTweet,
  tweetById,
  deleteTweetById,
} = require('../controllers/tweets');

router.get('/', authMiddleware, paginationMiddleware, tweetsFeed);
router.get('/feed/:username', paginationMiddleware, tweetsFeedByUserName);
router.post('/:id/likes', authMiddleware, likeTweet);
router.post('/:id/comments', authMiddleware, paginationMiddleware, createComment);
router.post('/', authMiddleware, createTweet);
router.get('/:id', tweetById);
router.delete('/:id', authMiddleware, deleteTweetById);

module.exports = router;
