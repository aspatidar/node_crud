const jwt = require("jsonwebtoken");
const { Signup } = require("../model");

const logging = () => {
  return (req, res, next) => {
    console.log("A new request recived at => " + Date.now());
    // console.log('A new request method is => ', req.method);
    // console.log('A new request params is => ', req.params);
    console.log("Request Url is => ", req.originalUrl);
    next();
  };
};

const validateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1];
  if (token === null) {
    return res.status(400).send("Token not available");
  }

  // Verify Token
  try {
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Signup.findOne({
      where: {
        id: verifiedToken.id,
      },
    });
    if (user.token === token) {
      req.user = verifiedToken;
      next();
    }else{
      return res.status(403).send("Token invalid");
    }
  } catch (err) {
    res.status(403).send("Token invalid");
  }
};

const errorHandler = (err, req, res, next) => {
  console.log("Catch by error middleware => " + err);
  res.status(500).json({ msg: "Somthing went wrong", error: err });
};

const generateToken = (userId) =>{
  return jwt.sign({ id: userId }, process.env.JWT_SECRET);
}

module.exports = { logging, errorHandler, validateToken, generateToken};
