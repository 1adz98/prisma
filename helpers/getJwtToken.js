const jwt = require("jsonwebtoken");

const getJwtToken = (userId) => {
  return jwt.sign({ userId: userId }, process.env.JWT_SECRET, {
    expiresIn: "60d",
  });
};

module.exports = getJwtToken;
