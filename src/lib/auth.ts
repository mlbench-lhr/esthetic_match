import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev_jwt_secret_change_me";
const JWT_EXPIRES_IN = "7d";

export function signToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}
