import { UserServices } from "./user.service";
import handleAsync from "../../utils/handleAsync";
import handleResponse from "../../utils/handleResponse";
import httpStatus from "http-status";

const getAllUsers = handleAsync(async (req, res) => {
  const result = await UserServices.getAllUsers();
  res.send({ success: true, data: result });
});

const createAdmin = handleAsync(async (req, res) => {
  const result = await UserServices.createAdmin(req);
  handleResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Admin Created Successfully",
    data: result,
  });
});

export const UserControllers = {
  getAllUsers,
  createAdmin,
};
