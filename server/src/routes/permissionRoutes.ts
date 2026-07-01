import { Router } from "express";
import { getPermissions, getPermission, createPermission, updatePermission, deletePermission } from "../controllers/permissionController";
import { authenticate, requireRole } from "../middleware/auth";

const router = Router();

router.use(authenticate);
router.use(requireRole("Admin"));

router.get("/", getPermissions);
router.get("/:id", getPermission);
router.post("/", createPermission);
router.put("/:id", updatePermission);
router.delete("/:id", deletePermission);

export default router;
