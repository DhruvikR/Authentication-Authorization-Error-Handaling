import jwt from "jsonwebtoken";
import env from "dotenv";

env.config();

function jwtTokens(user) {
  const accesstoken = jwt.sign({ id: user.id }, process.env.ACCESS_JWT_SECRET, {
    expiresIn: "3000s",
  });
  const refreshToken = jwt.sign(
    { id: user.id },
    process.env.REFRESH_JWT_SECRET,
    {
      expiresIn: "1y",
    }
  );
  return { accesstoken, refreshToken };
}

export { jwtTokens };
