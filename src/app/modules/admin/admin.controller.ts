import { AdminServices } from "./admin.service";
import handleAsync from "../../utils/handleAsync";
import pick from "../../utils/pick";

const findAllAdmins = handleAsync(async (req, res) => {
  const queries = pick(req.query, ["name", "email", "searchTerm", "contactNumber"]);
  const options = pick(req.query, ["limit","page", 'sortBy', 'sortOrder']);
  const result = await AdminServices.findAllAdmins(queries, options);

  res.status(200).send({
    success: true,
    statusCode: 200,
    message: "Admins data retrieved successfully.",
    data: result,
  });
});

export const AdminControllers = { findAllAdmins };
