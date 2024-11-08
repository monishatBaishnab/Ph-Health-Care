import { AdminServices } from "./admin.service";
import handleAsync from "../../utils/handleAsync";
import pick from "../../utils/pick";
import handleResponse from "../../utils/handleResponse";
import httpStatus from "http-status";

const findAllAdmins = handleAsync(async (req, res) => {
  const filters = pick(req.query, ["name", "email", "searchTerm", "contactNumber"]);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await AdminServices.findAllAdminsFromDb(filters, options);

  handleResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Admins data retrieved successfully.",
    data: result.data,
    meta: result.meta,
  });
});

const findSingleAdmin = handleAsync(async (req, res) => {
  const { id } = req.params;

  const result = await AdminServices.findSingleAdminFromDb(id);

  handleResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Admin retrieved successfully.",
    data: result,
  });
});

const updateAdmin = handleAsync(async (req, res) => {
  const { id } = req.params;

  const result = await AdminServices.updateAdminFromDb(id, req.body);

  handleResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Admin updated successfully.",
    data: result,
  });
});

const deleteAdmin = handleAsync(async (req, res) => {
  const { id } = req.params;

  const result = await AdminServices.deleteAdminFromDb(id);

  handleResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Admin deleted successfully.",
    data: result,
  });
});

export const AdminControllers = { findAllAdmins, findSingleAdmin, updateAdmin, deleteAdmin };
