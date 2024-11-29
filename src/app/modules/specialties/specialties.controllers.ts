import httpStatus from "http-status";
import handleAsync from "../../utils/handleAsync";
import handleResponse from "../../utils/handleResponse";
import { SpecialtiesServices } from "./specialties.services";
import { TFile } from "../../interface/file";

const fetchAll = handleAsync(async (req, res) => {
  const result = "";

  handleResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All Specialties Retrieved Successfully.",
    data: result,
  });
});
const createOne = handleAsync(async (req, res) => {
  const file = req.file;
  const data = req.body;
  const result = await SpecialtiesServices.createOneIntoDB(data, file as TFile);

  handleResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Specialty Created Successfully.",
    data: result,
  });
});
const updateOne = handleAsync(async (req, res) => {
  const result = "";

  handleResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Specialty Updated Successfully.",
    data: result,
  });
});

const deleteOne = handleAsync(async (req, res) => {
  const result = "";

  handleResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Specialty Deleted Successfully.",
  });
});

export const SpecialtiesControllers = {
  fetchAll,
  createOne,
  updateOne,
  deleteOne,
};
