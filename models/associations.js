import User from "./User.js";
import UserGroup from "./UserGroup.js";
import Group from "./Group.js";
import Expense from "./Expense.js";
import ExpenseParticipant from "./ExpenseParticipant.js";

User.belongsToMany(Group, {
  through: UserGroup,
  foreignKey: "userId",
  as: "groups",
});

Group.belongsToMany(User, {
  through: UserGroup,
  foreignKey: "groupId",
  as: "members",
});

Group.belongsTo(User, {
  foreignKey: "created_by",
  as: "creator",
});

User.hasMany(Group, {
  foreignKey: "created_by",
  as: "createdGroups",
});

Group.hasMany(Expense, {
  foreignKey: "groupId",
  as: "expenses",
});

Expense.belongsTo(Group, {
  foreignKey: "groupId",
  as: "group",
});

User.hasMany(Expense, {
  foreignKey: "paidBy",
  as: "paidExpenses",
});

Expense.belongsTo(User, {
  foreignKey: "paidBy",
  as: "payer",
});

Expense.belongsToMany(User, {
  through: ExpenseParticipant,
  foreignKey: "expenseId",
  otherKey: "userId",
  as: "participants",
});

User.belongsToMany(Expense, {
  through: ExpenseParticipant,
  foreignKey: "userId",
  otherKey: "expenseId",
  as: "sharedExpenses",
});

ExpenseParticipant.belongsTo(Expense, {
  foreignKey: "expenseId",
});

ExpenseParticipant.belongsTo(User, {
  foreignKey: "userId",
});

export { User, UserGroup, Group, Expense, ExpenseParticipant };
