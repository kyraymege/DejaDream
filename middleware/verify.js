const jwt = require("jsonwebtoken");
const UserRefreshToken = require("../models/user-refreshToken");

//TODO: If required, change status codes
const authenticateToken = async (req, res, next) => {
  const token = req.headers["authorization"] || req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  jwt.verify(token, process.env.ACCESS_SECRET, async (err, user) => {
    if (err) {
      // if (err.name === "TokenExpiredError") {
      //   return res.status(401).json({ message: "Unauthorized: Token expired" });
      // } else {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
      // }
    }

    // Token is valid
    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };
