const { Signup } = require("../model");
const bcrypt = require("bcrypt");
const {generateToken} = require('../middleware');

const userSignup = async (req, res) => {
  const {first_name, last_name, email, password} = body;
  const user = await Signup.findOne({
    where: { email },
  });
  // verify user
  if (user) {
    return res
      .status(400)
      .json({ msg: "Email is already associated with an account" });
  }

  const result = await Signup.build({
    first_name: first_name,
    last_name: last_name,
    email: email,
    password: password,
  });
  await result.save();
  console.log(result, "result created");
  res.status(200).json({ msg: "User ragister successfully", user: result });
};

const userSignin = async (req, res) => {
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
  const token = generateToken(user.id);
  const result = await Signup.update(
    { token: token },
    {
      where: {
        email: req.body.email,
      },
    }
  );
  console.log(result, "Token updated");
  res.status(200).json({
    id: user.id,
    name: user.first_name + " " + user.last_name,
    email: user.email,
    accessToken: token,
  });
};

module.exports = {
  userSignup,
  userSignin,
};
