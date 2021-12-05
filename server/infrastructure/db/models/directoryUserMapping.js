'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class DirectoryUserMapping extends Model {
        static associate(models) {
            DirectoryUserMapping.belongsTo(models.user, {
                foreignKey: 'userId',
            });
            DirectoryUserMapping.belongsTo(models.directory, {
                foreignKey: 'directoryId',
            });
        }
    }
    DirectoryUserMapping.init(
        {
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            directoryId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'directoryusermapping',
        },
    );
    return DirectoryUserMapping;
};