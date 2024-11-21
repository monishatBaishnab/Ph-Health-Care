import httpStatus from "http-status";
import handleAsync from "../../utils/handleAsync";
import handleResponse from "../../utils/handleResponse";
import { AuthServices } from "./auth.services";

const loginUser = handleAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);

  res.cookie("refreshToken", result.refreshToken);

  handleResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User logged in successfully.",
    data: result.token,
  });
});

const refreshToken = handleAsync(async (req, res) => {
  const result = await AuthServices.refreshToken(req.cookies);

  res.cookie("refreshToken", result.refreshToken);

  handleResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User logged in successfully.",
    data: result.token,
  });
});

export const AuthControllers = {
  loginUser,
  refreshToken
};
