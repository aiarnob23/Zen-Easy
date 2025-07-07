import jwt from "jsonwebtoken";

export const createToken = (
  jwtPayload: { email: String },
  secret: string,
) => {
  let token = jwt.sign(jwtPayload , secret , {expiresIn:'14'});
  return `Bearer ${token}`;
};