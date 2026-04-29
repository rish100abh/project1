import { Router } from "express";
import { authenticate } from "../../common/middlewares/auth.middleware.js";
import { authorize } from "../../common/middlewares/role.middleware.js";
import { getUsers } from "./user.controller.js";

const router = Router();

router.get("/", authenticate, authorize("ADMIN"), getUsers);

export default router;