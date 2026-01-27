import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const ExpenseParticipant = sequelize.define("ExpenseParticipant", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  groupId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  expenseId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  shareAmount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default ExpenseParticipant;
