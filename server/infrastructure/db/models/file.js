'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class File extends Model {
    static associate(models) {
        File.belongsTo(models.directory, {
            foreignKey: 'directoryId',
        });
    }
  }
  File.init(
    {
      filename: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      extension: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      path: {
        type: DataTypes.STRING,
        allowNull: false,
      },
        directoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
      sequelize,
      modelName: 'file',
    },
  );
  return File;
};
