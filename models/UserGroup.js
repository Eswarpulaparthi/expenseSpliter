import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const UserGroup = sequelize.define("UserGroup", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  groupId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default UserGroup;
