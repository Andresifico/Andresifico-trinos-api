const ApiError = require('../utils/ApiError');
const { User, Tweet, Coment } = require('../database/models');
const ComentSerializer = require('../serializers/ComentSerializer');

const likeComents = async (req, res, next) => {
  try {
    const { params } = req;
    const comentId = Number(params.id);
    const coment = await Coment.findOne({ where: comentId });
    if (!coment) {
      throw new ApiError('Coment not Found', 404);
    }
    const actualLikeCounter = coment.likeCounter;
    await coment.update({ likeCounter: actualLikeCounter + 1 });

    res.json(new ComentSerializer(coment));
  } catch (err) {
    next(err);
  }
};

const deleteComentById = async (req, res, next) => {
  try {
    const { params } = req;
    const response = { status: 'success', data: null };
    const coment = await Coment.findOne({ where: { id: Number(params.id) } });

    if (coment === null) {
      response.status = 'error';
      res.json(response);
    }
    const tweet = await Tweet.findOne({ where: { id: Number(coment.tweetId) } });
    if (req.user.id === tweet.userId) {
      coment.destroy({ where: { id: Number(params.id) } });
    } else {
      response.status = 'error';
    }

    res.json(response);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  deleteComentById,
  likeComents,
};
