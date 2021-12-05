'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Directory extends Model {
    static associate(models) {
      Directory.hasMany(models.directoryusermapping, {
        foreignKey: 'directoryId',
      });
      Directory.hasMany(models.file, {
        foreignKey: 'directoryId',
      });
    }
  }
    Directory.init(
    {
      path: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    },
    {
      sequelize,
      modelName: 'directory',
    },
  );
  return Directory;
};
