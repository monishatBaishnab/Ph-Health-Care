import { UserServices } from "./user.service";
import handleAsync from "../../utils/handleAsync";

const getAllUsers = handleAsync(async (req, res) => {
  const result = await UserServices.getAllUsers();
  res.send({ success: true, data: result });
});

const createAdmin = handleAsync(async (req, res) => {
  const result = await UserServices.createAdmin(req.body);
  res.send({ success: true, data: result });
});

export const UserControllers = {
  getAllUsers,
  createAdmin,
};
