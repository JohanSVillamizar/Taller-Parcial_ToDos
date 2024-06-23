const {DataTypes} = require('sequelize');
const sequelize = require('../db/sequelize');

const Todo = sequelize.define(
    'todos', 
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        completed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
    },
    {
        timestamps: false
    }
);

Todo.sync({alter: true});

module.exports = Todo;