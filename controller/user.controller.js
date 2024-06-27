const { User } = require("../model");
const { Employee } = require("../model");
const { Op } = require("sequelize");
// Get all users
const handlGetAllUser = async (req, res) => {
  console.log("params => ", req.query);
  if (req.query) {
    const query = req.query;
    const offset = query.page ? (query.page - 1) * query.limit : 0;
    const limit = query.limit ? query.limit : 10;
    const searchQuery = query.searchQuery ? "%" + query.searchQuery + "%" : "";
    
    const results = await User.findAll({
      limit: limit,
      offset: offset,
      order: ["first_name"],
      where: {
        [Op.or]: [
          {
            first_name: {
              [Op.iLike]: searchQuery,
            },
          },
        ],
      },
    });
    res.status(200).json({ msg: "Success", users: results });
  } else {
    const results = await User.findAll();
    res.status(200).json({ msg: "Success", users: results });
  }
};
// Get user by id
const handleGetUserById = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  console.log(user);
  res.status(200).json({ msg: "Success", user: user });
};
// Create user
const handlPostUser = async (req, res) => {
  const body = req.body;
  const { first_name, last_name, email, gender } = body;
  if (!body || !first_name || !last_name || !email || !gender) {
    console.log(body);
    return res.status(401).json({ msg: "all fields are required ..." });
  }
  const results = await User.create({
    first_name: first_name,
    last_name: last_name,
    email: email,
    gender: gender,
  });
  console.log(results);
  res.status(201).json({ msg: "User successfully added", user: results });
};
// Update user by id
const handleUpdateUserById = async (req, res) => {
  const result = await User.update(
    { ...req.body },
    {
      where: {
        id: req.params.id,
      },
    }
  );
  if (result === 0) {
    return res.status(404).json({ msg: "User not found" });
  } else {
    const user = await User.findByPk(req.params.id);
    res.status(200).json({ msg: "User updated", user: user });
  }
};
// Delete user by id
const handleDeleteUserById = async (req, res) => {
  const result = await User.destroy({
    where: {
      id: req.params.id,
    },
  });
  if (result === 0) {
    res.status(404).json({
      msg: "User not found",
    });
  } else {
    res.status(200).json({
      msg: "User deleted successfully",
    });
  }
};

module.exports = {
  handlGetAllUser,
  handleGetUserById,
  handlPostUser,
  handleUpdateUserById,
  handleDeleteUserById,
};
