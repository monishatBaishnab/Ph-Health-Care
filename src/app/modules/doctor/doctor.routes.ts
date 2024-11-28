import { Router } from "express";
import { DoctorControllers } from "./doctor.controllers";

const router = Router();

router.post("/", DoctorControllers.createDoctor);

export const DoctorRoutes = router;
