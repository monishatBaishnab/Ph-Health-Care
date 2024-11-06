import { Router } from "express";
import { UserControllers } from "./user.controller";

const router = Router();

router.get("/", UserControllers.getAllUsers);

router.post("/create-admin", UserControllers.createAdmin);

export const UserRoutes = router;
