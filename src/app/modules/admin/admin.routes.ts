import { Router } from "express";
import { AdminControllers } from "./admin.controller";

const router = Router();

router.get('/', AdminControllers.findAllAdmins)

export const AdminRoutes = router;
