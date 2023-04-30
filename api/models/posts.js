//const { sequelize } = require(".")

module.exports = (sequelize, DataTypes) => {

    const posts = sequelize.define("posts", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        postText: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    return posts
};