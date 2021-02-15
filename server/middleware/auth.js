const jwt = require("jsonwebtoken");

// token should contain accountId
// accountId will be stored in req.accountId
module.exports = (req, res, next) => {
  let token = req.get("Authorization");

  // no token attached
  if (!token) {
    const error = new Error("Unauthorized");
    error.statusCode = 401;
    throw error;
  }

  // parse token - Bearer <token>
  token = token.split(" ")[1];

  try {
    token = jwt.verify(token, process.env.JWT_KEY);
  } catch (err) {
    throw err;
  }

  // not authenticated
  if (!token) {
    const error = new Error("Unauthorized");
    error.statusCode = 401;
    throw error;
  }

  // valid token
  req.accountId = token.accountId;
  next();
};
