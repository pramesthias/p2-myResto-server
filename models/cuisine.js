'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cuisine extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cuisine.belongsTo(models.User, {foreignKey: "authorId"});
      Cuisine.belongsTo(models.Category, {foreignKey: "categoryId"});
    }
  }
  Cuisine.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Name cannot be Empty!"
        },
        notEmpty: {
          msg: "Name cannot be Empty!"
        }
      }
    },

    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Description cannot be Empty!"
        },
        notEmpty: {
          msg: "Description cannot be Empty!"
        }
      }
    },

    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Price cannot be Empty!"
        },
        notEmpty: {
          msg: "Price cannot be Empty!"
        }
      }
    },

    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "imgUrl cannot be Empty!"
        },
        notEmpty: {
          msg: "imgUrl cannot be Empty!"
        }
      }
    },

    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "categoryId cannot be Empty!"
        },
        notEmpty: {
          msg: "categoryId cannot be Empty!"
        }
      }
    },

    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "authorId cannot be Empty!"
        },
        notEmpty: {
          msg: "authorId cannot be Empty!"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Cuisine',
  });
  return Cuisine;
};