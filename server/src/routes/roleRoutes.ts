import { Router } from "express";
import { getRoles, getRole, createRole, updateRole, deleteRole } from "../controllers/roleController";
import { authenticate, requireRole } from "../middleware/auth";

const router = Router();

router.use(authenticate);
router.use(requireRole("Admin"));

router.get("/", getRoles);
router.get("/:id", getRole);
router.post("/", createRole);
router.put("/:id", updateRole);
router.delete("/:id", deleteRole);

export default router;
