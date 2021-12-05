'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class SystemLog extends Model {
        static associate(models) {
            SystemLog.belongsTo(models.user, {
                foreignKey: 'userId',
            });
        }
    }
    SystemLog.init(
        {
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            message: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'systemlog',
        },
    );
    return SystemLog;
};