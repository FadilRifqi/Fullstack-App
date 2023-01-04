import { Sequelize } from "sequelize";
import db from "../config/DataBase.js";
import Users from "./UserModel.js";

const { DataTypes } = Sequelize;

const Friends = db.define(
  "friends",
  {
    friend_uuid: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    friend_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    freezeTableName: true,
  }
);

Users.hasMany(Friends);
Friends.belongsTo(Users, { foreignKey: "user_id",onDelete: 'CASCADE' });

export default Friends;

