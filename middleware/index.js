const jwt = require('jsonwebtoken');
 
 logReqRes = () => {
  return (req, res, next) => {
    console.log("A new request recived at => " + Date.now());
    // console.log('A new request method is => ', req.method);
    // console.log('A new request params is => ', req.params);
    console.log('Request Url is => ', req.originalUrl);
    next();
  };
}


validateToken = (req, res, next) =>{
    const authHeader = req.headers["authorization"];
    const token = authHeader.split(" ")[1];
    if (token === null) {
      res.status(400).send("Token not available");
    }
    // Verify Token 
    jwt.verify(token, process.env.JWT_SECRET, function(err, user) {
      if (err) {
        res.status(403).send("Token invalid");
      } else {
        req.user = user;
        next();
      }
    });
  };

handleErrors = (err, req, res, next) => {
    console.log("Catch by error middleware => " + err);
    res.status(500).json({msg: "Somthing went wrong", error: err});
}

module.exports = {logReqRes, handleErrors, validateToken};