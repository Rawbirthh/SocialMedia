import { Router } from "express";
import { getPermissions, getPermission, createPermission, updatePermission, deletePermission } from "../controllers/permissionController";

const router = Router();

router.get("/", getPermissions);
router.get("/:id", getPermission);
router.post("/", createPermission);
router.put("/:id", updatePermission);
router.delete("/:id", deletePermission);

export default router;
