const jwt = require("jsonwebtoken");
const jwt_secret = process.env.JWT_SECRET;

const generateToken = (user) => {
  let token = jwt.sign(
    {
      id: user_id,
      email: user.email,
    },
    jwt_secret,
    { expiresIn: "15m" }
  );
  return token;
};

module.exports = generateToken;
