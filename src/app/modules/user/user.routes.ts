import { Router } from "express";
import { UserControllers } from "./user.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { uploadHelpers } from "../../utils/uploadHelpers";

const router = Router();

router.get("/", auth(UserRole.ADMIN, UserRole.SUPER_ADMIN), UserControllers.getAllUsers);

router.post(
  "/create-admin",
  uploadHelpers.upload.single("file"),
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  UserControllers.createAdmin
);

export const UserRoutes = router;
