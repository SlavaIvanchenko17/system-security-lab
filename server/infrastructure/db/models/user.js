'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.hasMany(models.directoryusermapping, {
                foreignKey: 'userId',
            });
            User.hasMany(models.systemlog, {
                foreignKey: 'userId',
            });
        }
    }
    User.init(
        {
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            isBlocked: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            isAdmin: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            countLogin: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'user',
        },
    );
    return User;
};
