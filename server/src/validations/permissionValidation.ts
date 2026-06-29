import { z } from "zod";

export const createPermissionSchema = z.object({
  name: z.string().min(1, "Permission name is required"),
  description: z.string().optional(),
});

export const updatePermissionSchema = z.object({
  name: z.string().min(1, "Permission name is required").optional(),
  description: z.string().optional(),
});

export type CreatePermissionInput = z.infer<typeof createPermissionSchema>;
export type UpdatePermissionInput = z.infer<typeof updatePermissionSchema>;
