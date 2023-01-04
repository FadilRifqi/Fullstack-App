import { Sequelize } from "sequelize";
import db from "../config/DataBase.js";
import Users from "./UserModel.js";

const { DataTypes } = Sequelize;

const Messages = db.define(
  "messages",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    uuid: {
      type: Sequelize.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    sender_uuid: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    sender_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    receiver_uuid: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    text: {
      type: DataTypes.STRING,
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

Messages.belongsTo(Users, { foreignKey: "sender_id", as: "sender" });
Messages.belongsTo(Users, { foreignKey: "receiver_id", as: "receiver" });

export default Messages;
