const { User } = require("../model/user.model");
// Get all users
handlGetAllUser = async (req, res) => {
  try {
    console.log('params => ', req.query)
    if(req.query){
      const results = await User.findAll({
        where: [req.query],
      });
      res.status(200).json({ msg: "Success", users: results });
    }else{
      const results = await User.findAll();
      res.status(200).json({ msg: "Success", users: results });
    }
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Somthing went wrong", error: error });
  }
};
// Get user by id
handleGetUserById = async (req, res) => {
  try {
    console.log(req);
    const user = await User.findByPk(req.params.id);
    console.log(user);
    res.status(200).json({ msg: "Success", user: user });
  } catch (error) {
    res.status(500).json({ msg: "Somthing went wrong", error: error });
  }
};
// Create user
handlPostUser = async (req, res) => {
  try {
    const body = req.body;

    if (
      !body ||
      !body.first_name ||
      !body.last_name ||
      !body.email ||
      !body.gender
    ) {
      console.log(body);
      return res.status(401).json({ msg: "all fields are required ..." });
    }
    const results = await User.create({
      first_name: body.first_name,
      last_name: body.last_name,
      email: body.email,
      gender: body.gender,
    });
    console.log(results);
    res.status(201).json({ msg: "User successfully added", user: results });
  } catch (error) {
    res.status(500).json({ msg: "Somthing went wrong", error: error });
  }
};
// Update user by id
handleUpdateUserById = async (req, res) => {
  try {
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
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Somthing went wrong", error: error });
  }
};
// Delete user by id
handleDeleteUserById = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({ msg: "Somthing went wrong", error: error });
  }
};

module.exports = {
  handlGetAllUser,
  handleGetUserById,
  handlPostUser,
  handleUpdateUserById,
  handleDeleteUserById
};
