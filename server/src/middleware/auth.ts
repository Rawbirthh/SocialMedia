import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET: string = process.env.JWT_SECRET ?? "fallback-secret";

export interface JwtPayload {
  userId: number;
  email: string;
  roles: string[];
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: { _global: ["Unauthorized"] } });
  }

  const parts = authHeader.split(" ");
  const token = parts[1];
  if (!token) {
    return res.status(401).json({ error: { _global: ["Invalid token"] } });
  }

  try {
    const payload = jwt.decode(token) as JwtPayload | null;
    if (!payload) {
      return res.status(401).json({ error: { _global: ["Invalid token"] } });
    }
    jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ error: { _global: ["Invalid token"] } });
  }
};

export const requireRole = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: { _global: ["Unauthorized"] } });
    }

    const hasRole = req.user.roles.some((role) => roles.includes(role));
    if (!hasRole) {
      return res.status(403).json({ error: { _global: ["Forbidden: Insufficient permissions"] } });
    }

    next();
  };
};
