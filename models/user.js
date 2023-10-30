'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Cuisine, {foreignKey: 'authorId'});
    }
  }
  User.init({
    username: DataTypes.STRING,

    //uniq email format
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "Email cannot be Empty!"
        },
        notEmpty: {
          msg: "Email cannot be Empty!"
        },
        isEmail: {
          msg: "Email should be written in email format!"
        }
      }
    },

    //length minimal 5
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password cannot be Empty!"
        },
        notEmpty: {
          msg: "Password cannot be Empty!"
        },
        len: {
          args: [5],
          msg: "Minimum password length is 5"
        }
      }
    },


    role: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};