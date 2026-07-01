import { Router } from "express";
import { createUser, getUsers, updateUser, deleteUser } from "../controllers/userController";
import { authenticate, requireRole } from "../middleware/auth";

const router = Router();

router.use(authenticate);
router.use(requireRole("Admin"));

router.post("/", createUser);
router.get("/", getUsers);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
