const { User } = require("../model/user.model");
// Get all users
handlGetAllUser = async (req, res) => {
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
    
  }
// Get user by id
handleGetUserById = async (req, res) => {
    const user = await User.findByPk(req.params.id);
    console.log(user);
    res.status(200).json({ msg: "Success", user: user });

};
// Create user
handlPostUser = async (req, res) => {
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
};
// Update user by id
handleUpdateUserById = async (req, res) => {
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
handleDeleteUserById = async (req, res) => {
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
  handleDeleteUserById
};
