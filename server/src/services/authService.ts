import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as userService from "./userService";
import { AppError } from "../errors";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret";

export const login = async (email: string, password: string) => {
  const user = await userService.getUserByEmailWithRoles(email);
  if (!user) {
    throw new AppError("Invalid email or password", 401, "email");
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new AppError("Invalid email or password", 401, "password");
  }

  const roleNames = user.roles.map((ur) => ur.role.name);

  const token = jwt.sign(
    { userId: user.id, email: user.email, roles: roleNames },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

  return {
    token,
    user: { id: user.id, name: user.name, email: user.email, roles: roleNames },
  };
};
