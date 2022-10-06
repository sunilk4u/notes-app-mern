const jwt = require("jsonwebtoken");
const jwt_secret = process.env.JWT_SECRET;

const generateToken = (user) => {
  console.log(jwt_secret);
  let token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    jwt_secret,
    { expiresIn: "15m" }
  );
  return token;
};

module.exports = generateToken;
