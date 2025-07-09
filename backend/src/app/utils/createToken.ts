import jwt from "jsonwebtoken";

export const createToken = (
  jwtPayload: { userId: String },
  secret: string,
) => {
  let token = jwt.sign(jwtPayload , secret , {expiresIn:'14'});
  return `Bearer ${token}`;
};