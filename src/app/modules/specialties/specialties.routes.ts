import { Router } from "express";
import { SpecialtiesControllers } from "./specialties.controllers";
import { uploadHelpers } from "../../utils/uploadHelpers";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import parseJSON from "../../utils/paseJSON";

const router = Router();

router.get("/", SpecialtiesControllers.fetchAll);

router.post(
  "/",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  uploadHelpers.upload.single("file"),
  parseJSON,
  SpecialtiesControllers.createOne
);

export const SpecialtiesRoutes = router;
