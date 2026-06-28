import { Request, Response } from "express";
import * as authService from "../services/authService";
import { loginSchema } from "../validations/authValidation";
import { AppError } from "../errors";

export const login = async (req: Request, res: Response) => {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.flatten().fieldErrors });
    }

    const { email, password } = parsed.data;
    const result = await authService.login(email, password);
    res.status(200).json(result);
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: { [error.field]: [error.message] } });
    }
    res.status(500).json({ error: { _global: ["Login failed"] } });
  }
};
