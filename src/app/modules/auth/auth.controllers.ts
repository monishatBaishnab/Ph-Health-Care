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

const forgotPassword = handleAsync(async (req, res) => {
  await AuthServices.forgotPassword(req.body);

  handleResponse(res, {
    message: "Check your mail.",
    statusCode: httpStatus.OK,
    success: true,
    // data: result,
  });
});

const resetPassword = handleAsync(async (req, res) => {
  const token = req.headers.authorization || '';

  await AuthServices.resetPassword(token, req.body);

  handleResponse(res, {
    message: "Password successfully reset.",
    statusCode: httpStatus.OK,
    success: true,
    // data: result,
  });
});

export const AuthControllers = {
  loginUser,
  refreshToken,
  forgotPassword,
  resetPassword
};
