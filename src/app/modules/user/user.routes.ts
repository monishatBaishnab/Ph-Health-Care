import { Router } from "express";
import { UserControllers } from "./user.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { uploadHelpers } from "../../utils/uploadHelpers";
import { UserSchemas } from "./user.schemas";

const router = Router();

router.get("/", 
  // auth(UserRole.ADMIN, UserRole.SUPER_ADMIN), 
  UserControllers.getAllUsers);

router.post(
  "/create-admin",
  uploadHelpers.upload.single("file"),
  
  // auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  // UserControllers.createAdmin
  (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    UserControllers.createAdmin(req, res, next);
  }
);

router.post("/create-doctor", uploadHelpers.upload.single("file"), (req, res, next) => {
  req.body = UserSchemas.createDoctorSchema.parse(JSON.parse(req.body.data));
  UserControllers.createDoctor(req, res, next);
});

export const UserRoutes = router;
