const Sequelize = require("sequelize");
const sequelize = require("../configs/databaseConfig");

const User = sequelize.define("user", {
  fullName: { type: Sequelize.DataTypes.STRING(255), allowNull: false },
  email: { type: Sequelize.DataTypes.STRING(255), allowNull: false },
  mobile: { type: Sequelize.DataTypes.STRING(255), allowNull: false },
});

module.exports = User;
