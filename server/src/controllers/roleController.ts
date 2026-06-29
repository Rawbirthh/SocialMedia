import { Request, Response } from "express";
import * as roleService from "../services/roleService";
import { createRoleSchema, updateRoleSchema } from "../validations/roleValidation";
import { AppError } from "../errors";

export const getRoles = async (_req: Request, res: Response) => {
  try {
    const roles = await roleService.getAllRoles();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ error: { _global: ["Failed to fetch roles"] } });
  }
};

export const getRole = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const role = await roleService.getRoleById(id);
    if (!role) {
      return res.status(404).json({ error: { _global: ["Role not found"] } });
    }
    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({ error: { _global: ["Failed to fetch role"] } });
  }
};

export const createRole = async (req: Request, res: Response) => {
  try {
    const parsed = createRoleSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.flatten().fieldErrors });
    }
    const role = await roleService.createRole(parsed.data);
    res.status(201).json(role);
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: { [error.field]: [error.message] } });
    }
    res.status(500).json({ error: { _global: ["Failed to create role"] } });
  }
};

export const updateRole = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const parsed = updateRoleSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.flatten().fieldErrors });
    }
    const role = await roleService.updateRole(id, parsed.data);
    res.status(200).json(role);
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: { [error.field]: [error.message] } });
    }
    res.status(500).json({ error: { _global: ["Failed to update role"] } });
  }
};

export const deleteRole = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await roleService.deleteRole(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: { _global: ["Failed to delete role"] } });
  }
};
