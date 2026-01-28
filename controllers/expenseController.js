import {
  Expense,
  Group,
  User,
  ExpenseParticipant,
} from "../models/associations.js";

const createExpense = async (req, res) => {
  const groupId = req.params.groupId;
  const { paidBy, amount, description, category } = req.body;
  const userId = req.user.id;

  if (!amount || amount <= 0) {
    return res.status(400).json({ message: "Invalid amount" });
  }

  try {
    const group = await Group.findByPk(groupId, {
      include: {
        model: User,
        as: "members",
        attributes: ["id"],
      },
    });

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    const members = group.members;
    const isMember = members.some((m) => m.id === userId);

    if (!isMember) {
      return res.status(403).json({ message: "Not a group member" });
    }

    const expense = await Expense.create({
      groupId: groupId,
      paidBy: paidBy,
      amount: amount,
      description: description,
      category: category,
    });

    const baseShare = Math.floor(amount / members.length);
    let remainder = amount % members.length;

    const participantsPayload = members.map((member) => {
      let share = baseShare;
      if (remainder > 0) {
        share++;
        remainder--;
      }

      return {
        groupId,
        expenseId: expense.id,
        userId: member.id,
        shareAmount: share,
      };
    });

    await ExpenseParticipant.bulkCreate(participantsPayload);
    res.status(201).json({ success: true, expense });
  } catch (error) {
    console.log("error creating expense");
    res.status(500).json({ success: false, message: error.message });
  }
};

const getExpenses = async (req, res) => {
  const { groupId } = req.params;
  const userId = req.user.id;
  try {
    const group = await Group.findByPk(groupId, {
      include: [
        {
          model: User,
          as: "members",
          attributes: ["id"],
        },
        {
          model: Expense,
          as: "expenses",
          include: [
            {
              model: User,
              as: "payer",
              attributes: ["id", "name", "email"],
            },
            {
              model: User,
              as: "participants",
              attributes: ["id", "name"],
              through: {
                attributes: ["shareAmount"],
              },
            },
          ],
        },
      ],
    });

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    const isMember = group.members.some((m) => m.id === userId);
    if (!isMember) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    res.json({
      success: true,
      expenses: group.expenses,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getBalance = async (req, res) => {
  const { groupId } = req.params;
  const userId = req.user.id;

  try {
    const [totalPaid, totalShare] = await Promise.all([
      Expense.sum("amount", {
        where: {
          groupId,
          paidBy: userId,
        },
      }),

      ExpenseParticipant.sum("shareAmount", {
        where: {
          groupId,
          userId,
        },
      }),
    ]);

    const paid = totalPaid || 0;
    const share = totalShare || 0;

    res.json({
      success: true,
      totalPaid: paid,
      totalShare: share,
      netBalance: paid - share,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to calculate balance" });
  }
};

const deleteExpenses = async (req, res) => {
  const { groupId } = req.params;
  const userId = req.user.id;
  try {
    const group = await Group.findByPk(groupId, {
      include: {
        model: User,
        as: "members",
        attributes: ["id"],
      },
    });
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    const members = group.members;
    const isMember = members.some((m) => m.id === userId);

    if (!isMember) {
      return res.status(403).json({ message: "Not a group member" });
    }

    await Expense.destroy({
      where: {
        groupId: groupId,
      },
    });

    res.json({
      success: true,
      message: `Expenses deleted for group Id ${groupId}`,
    });
  } catch (error) {
    console.log(error);
  }
};
export { createExpense, getExpenses, getBalance, deleteExpenses };
