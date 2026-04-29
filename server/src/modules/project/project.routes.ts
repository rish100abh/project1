import { Router } from "express";
import { authenticate } from "../../common/middlewares/auth.middleware.js";
import { validate } from "../../common/middlewares/validate.middleware.js";
import {
  createProject,
  deleteProject,
  getProjects,
  updateProject,
} from "./project.controller.js";
import { createProjectSchema, updateProjectSchema } from "./project.schema.js";

const router = Router();

router.use(authenticate);

router.get("/", getProjects);
router.post("/", validate(createProjectSchema), createProject);
router.patch("/:id", validate(updateProjectSchema), updateProject);
router.delete("/:id", deleteProject);

export default router;