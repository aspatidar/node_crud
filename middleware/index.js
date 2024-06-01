
 logReqRes = () => {
  return (req, res, next) => {
    console.log("A new request recived at => " + Date.now());
    // console.log('A new request method is => ', req.method);
    // console.log('A new request params is => ', req.params);
    console.log('Request Url is => ', req.originalUrl);
    next();
  };
}

handleErrors = () => {
  return (err, req, res, next) => {
    console.log("Catch by error middleware => " + err);
    res.status(500).json({msg: "Somthing went wrong", error: err});
  };
}

module.exports = {logReqRes, handleErrors};