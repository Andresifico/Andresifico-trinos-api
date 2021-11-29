/* eslint-disable no-param-reassign */
const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Coment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Coment.belongsTo(models.Tweet, { as: 'tweet' });
    }
  }
  Coment.init({
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    likeCounter: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  }, {
    sequelize,
    modelName: 'Coment',
  });
  return Coment;
};
