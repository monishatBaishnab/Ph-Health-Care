import { Router } from "express";
import { AuthControllers } from "./auth.controllers";

const router = Router();

router.post("/login", AuthControllers.loginUser);

router.post("/refresh-token", AuthControllers.refreshToken);

router.post("/forgot-password", AuthControllers.forgotPassword);

router.post('/reset-password', AuthControllers.resetPassword)

export const AuthRoutes = router;
