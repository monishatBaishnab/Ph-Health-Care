import { Router } from "express";
import { AdminControllers } from "./admin.controller";

const router = Router();

router.get("/", AdminControllers.findAllAdmins);

router.get("/:id", AdminControllers.findSingleAdmin);

router.patch("/:id", AdminControllers.updateAdmin);

router.delete("/:id", AdminControllers.deleteAdmin);

export const AdminRoutes = router;
