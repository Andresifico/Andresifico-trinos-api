const ApiError = require('../utils/ApiError');
const { Coment, Tweet, User } = require('../database/models');
const TweetSerializer = require('../serializers/TweetSerializer');
const TweetsSerializer = require('../serializers/TweetsSerializer');
const ComentSerializer = require('../serializers/ComentSerializer');

const createTweet = async (req, res, next) => {
  try {
    const { body } = req;
    if (body.text === '') {
      throw new ApiError('Bad request', 400);
    }
    const payload = {
      text: body.text,
      likeCounter: 0,
      userId: req.user.id,
    };

    const tweet = await Tweet.create(payload);
    const resp = await Tweet.findOne({
      where: { id: tweet.dataValues.id },
      include: [{
        model: User,
        as: 'user',
        attributes: { exclude: ['password', 'active', 'role', 'token'] },
      }],
      ...req.pagination,
      attributes: { exclude: ['userId'] },
    });

    res.json(new TweetSerializer(resp));
  } catch (err) {
    next(err);
  }
};

const tweetById = async (req, res, next) => {
  try {
    const { params } = req;
    const tweetId = await Tweet.findOne({ where: { id: Number(params.id) } });
    const response = { status: 'success', data: null };
    if (!tweetId) {
      response.status = 'error';
    }
    res.json(response);
  } catch (err) {
    next(err);
  }
};

const tweetsFeed = async (req, res, next) => {
  const where = {
    userId: req.user.id,
  };

  const allMyTweets = await Tweet.findAll({
    where,
    include: [{
      model: User,
      as: 'user',
      attributes: { exclude: ['password', 'active', 'role', 'token'] },
    },
    {
      model: Coment,
      as: 'coments',
    }],
    ...req.pagination,
    attributes: { exclude: ['userId'] },
  });

  res.json(new TweetsSerializer(allMyTweets, await req.getPaginationInfo(Tweet)));
};

const tweetsFeedByUserName = async (req, res, next) => {
  try {
    const { params } = req;
    const user = await User.findOne({ where: { username: params.username } });
    if (!user) {
      throw new ApiError('User not found', 400);
    }
    const where = {
      userId: user.id,
    };

    const myTweets = await Tweet.findAll({
      where,
      include: [{
        model: User,
        as: 'user',
        attributes: { exclude: ['password', 'active', 'role', 'token'] },
      },
      {
        model: Coment,
        as: 'coments',
      }],
      ...req.pagination,
      attributes: { exclude: ['userId'] },
    });

    res.json(new TweetsSerializer(myTweets, await req.getPaginationInfo(Tweet)));
  } catch (err) {
    next(err);
  }
};

const likeTweet = async (req, res, next) => {
  try {
    const { params } = req;
    const tweetPrevious = await Tweet.findOne({ where: Number(params.id) });
    if (!tweetPrevious) {
      throw new ApiError('Tweet Not Found', 404);
    }
    const actualLikeCounter = tweetPrevious.likeCounter;
    await tweetPrevious.update({ likeCounter: (actualLikeCounter + 1) });
    const tweet = await Tweet.findOne({
      where: Number(params.id),
      include: [{
        model: User,
        as: 'user',
        attributes: { exclude: ['password', 'active', 'role', 'token'] },
      },
      {
        model: Coment,
        as: 'coments',
      }],
      attributes: { exclude: ['userId'] },
    });

    res.json(new TweetSerializer(tweet));
  } catch (err) {
    next(err);
  }
};

const createComment = async (req, res, next) => {
  try {
    const { body } = req;
    const coment = await Coment.create({
      text: body.text,
      likeCounter: 0,
      tweetId: Number(req.params.id),
    });
    res.json(new ComentSerializer(coment));
  } catch (err) {
    next(err);
  }
};

const deleteTweetById = async (req, res, next) => {
  try {
    const { params } = req;
    const tweet = await Tweet.findOne({ where: Number(params.id) });
    const response = { status: 'success', data: null };
    if (tweet && (req.user.id === tweet.userId)) {
      await tweet.destroy({ where: { id: Number(params.id) } });
    } else {
      response.status = 'error';
    }
    res.json(response);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createTweet,
  tweetById,
  tweetsFeed,
  tweetsFeedByUserName,
  likeTweet,
  createComment,
  deleteTweetById,

};
