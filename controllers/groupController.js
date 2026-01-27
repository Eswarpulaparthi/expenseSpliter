import { User, UserGroup, Group } from "../models/associations.js";

const createGroup = async (req, res) => {
  const name = req.body.name;
  try {
    const group = await Group.create({
      name: name,
      created_by: req.session.user.id,
    });
    const user = await User.findByPk(req.session.user.id);
    await group.addMember(user);
    res.status(201).json({ success: true, group });
  } catch (error) {
    console.log("error creating group", error);
  }
};

const groups = async (req, res) => {
  try {
    const user = await User.findByPk(req.session.user.id, {
      include: [
        {
          model: Group,
          as: "groups",
          attributes: ["id", "name"],
          through: { attributes: [] },
          include: [
            {
              model: User,
              as: "creator",
              attributes: ["id", "name"],
            },
          ],
        },
      ],
    });

    res.json({
      success: true,
      groups: user.groups,
    });
  } catch (error) {
    console.error("Error fetching groups:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch groups",
      error: error.message,
    });
  }
};

const addUserToGroup = async (req, res) => {
  try {
    const group = await Group.findByPk(req.params.groupId);
    const user = await User.findByPk(req.params.userId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const members = await group.getMembers({ where: { id: user.id } });
    if (members.length > 0) {
      return res.status(400).json({ message: "User already exists in group" });
    }
    await group.addMember(user);

    res.json({ message: "User added to group" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const groupMembers = async (req, res) => {
  try {
    const group = await Group.findByPk(req.params.id);

    if (!group) {
      return res.status(404).json({
        success: false,
        message: "Group not found",
      });
    }

    const members = await group.getMembers({
      attributes: ["id", "name", "email"],
      joinTableAttributes: [],
    });

    res.json({
      success: true,
      groupId: group.id,
      groupName: group.name,
      members,
    });
  } catch (error) {
    console.error("Error fetching members:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch members",
      error: error.message,
    });
  }
};

export { createGroup, groups, addUserToGroup, groupMembers };
