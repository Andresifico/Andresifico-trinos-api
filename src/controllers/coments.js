const ApiError = require('../utils/ApiError');
const { User, Tweet, Coment } = require('../database/models');
const ComentSerializer = require('../serializers/ComentSerializer');

const likeComents = async (req, res, next) => {
  try {
    const { params } = req;
    const comentId = Number(params.id);
    const coment = await Coment.findOne({ where: comentId });

    if (coment === null) {
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
    const coment = await Coment.findOne({ where: { id: Number(params.id) } });

    if (coment === null) {
      throw new ApiError('Coment not found', 404);
    } else {
      Coment.destroy({ where: { id: Number(params.id) } });
      res.json(new ComentSerializer(null));
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  deleteComentById,
  likeComents,
};
