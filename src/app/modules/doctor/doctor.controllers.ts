import httpStatus from "http-status";
import handleAsync from "../../utils/handleAsync";
import handleResponse from "../../utils/handleResponse";
import { DoctorServices } from "./doctor.services";

const createDoctor = handleAsync(async (req, res) => {
  const result = await DoctorServices.createDoctorIntoDb(req);

  handleResponse(res, {
    success: true,
    message: "Doctor created successfully.",
    statusCode: httpStatus.CREATED,
    data: result,
  });
});

export const DoctorControllers = {
  createDoctor,
};
