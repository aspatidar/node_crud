const { Signup } = require("../model/auth/signup.model");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

handleSignup = async (req, res) => {

    const body = req.body;
    const email = body.email;
    const user = await Signup.findOne({
      where: { email },
    });
    // verify user
    if (user) {
      return res
        .status(400)
        .json({ msg: "Email is already associated with an account" });
    }

    const result = await Signup.create({
      first_name: body.first_name,
      last_name: body.last_name,
      email: body.email,
      password: body.password,
    });
    res.status(200).json({ msg: "User ragister successfully", user: result });

};

handleSignIn = async (req, res) => {
    const { email, password } = req.body;
    const user = await Signup.findOne({
      where: { email },
    });

    // verify Email
    if (!user) {
      return res.status(404).json({ msg: "User not find" });
    }

    // Verify password
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      return res
        .status(404)
        .json({ msg: "Incorrect email and password combination" });
    }

    // Authenticate user with jwt
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    res.status(200).json({
      id: user.id,
      name: user.first_name + " " + user.last_name,
      email: user.email,
      accessToken: token,
    });
};

module.exports = {
  handleSignup,
  handleSignIn,
};
