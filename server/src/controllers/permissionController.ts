import { Request, Response } from "express";
import * as permissionService from "../services/permissionService";
import { createPermissionSchema, updatePermissionSchema } from "../validations/permissionValidation";
import { AppError } from "../errors";

export const getPermissions = async (_req: Request, res: Response) => {
  try {
    const permissions = await permissionService.getAllPermissions();
    res.status(200).json(permissions);
  } catch (error) {
    res.status(500).json({ error: { _global: ["Failed to fetch permissions"] } });
  }
};

export const getPermission = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const permission = await permissionService.getPermissionById(id);
    if (!permission) {
      return res.status(404).json({ error: { _global: ["Permission not found"] } });
    }
    res.status(200).json(permission);
  } catch (error) {
    res.status(500).json({ error: { _global: ["Failed to fetch permission"] } });
  }
};

export const createPermission = async (req: Request, res: Response) => {
  try {
    const parsed = createPermissionSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.flatten().fieldErrors });
    }
    const permission = await permissionService.createPermission(parsed.data);
    res.status(201).json(permission);
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: { [error.field]: [error.message] } });
    }
    res.status(500).json({ error: { _global: ["Failed to create permission"] } });
  }
};

export const updatePermission = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const parsed = updatePermissionSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.flatten().fieldErrors });
    }
    const permission = await permissionService.updatePermission(id, parsed.data);
    res.status(200).json(permission);
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: { [error.field]: [error.message] } });
    }
    res.status(500).json({ error: { _global: ["Failed to update permission"] } });
  }
};

export const deletePermission = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await permissionService.deletePermission(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: { _global: ["Failed to delete permission"] } });
  }
};
