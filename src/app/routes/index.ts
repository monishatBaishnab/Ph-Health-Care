import { Router } from "express";
import { AdminRoutes } from "../modules/admin/admin.routes";
import { UserRoutes } from "../modules/user/user.routes";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { DoctorRoutes } from "../modules/doctor/doctor.routes";

const routes = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/admin",
    route: AdminRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/doctors",
    route: DoctorRoutes,
  },
];

const router = Router();

routes.forEach(({ path, route }) => {
  router.use(path, route);
});

export const AppRoutes = router;
