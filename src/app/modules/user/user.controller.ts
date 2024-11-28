import { UserServices } from "./user.service";
import handleAsync from "../../utils/handleAsync";
import handleResponse from "../../utils/handleResponse";
import httpStatus from "http-status";
import pick from "../../utils/pick";

const getAllUsers = handleAsync(async (req, res) => {
  const filters = pick(req.query, ["email", "role", "searchTerm"]);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await UserServices.getAllUsers(filters, options);
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

const createDoctor = handleAsync(async (req, res) => {
  const result = await UserServices.createDoctorIntoDb(req.body, req.file);

  handleResponse(res, {
    success: true,
    message: "Doctor created successfully.",
    statusCode: httpStatus.CREATED,
    data: result,
  });
});

export const UserControllers = {
  getAllUsers,
  createAdmin,
  createDoctor,
};
