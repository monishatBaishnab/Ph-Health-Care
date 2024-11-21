import { Router } from "express";
import { AdminControllers } from "./admin.controller";
import validateRequest from "../../middlewares/validateRequest";
import { adminSchemas } from "./admin.schema";

const router = Router();

router.get("/", AdminControllers.findAllAdmins);

router.get("/:id", AdminControllers.findSingleAdmin);

router.patch("/:id", validateRequest(adminSchemas.update), AdminControllers.updateAdmin);

router.delete("/:id", AdminControllers.deleteAdmin);

export const AdminRoutes = router;
