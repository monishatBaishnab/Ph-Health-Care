import { Request, Response } from "express";
import { UserServices } from "./user.service";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsers();
    res.send({ success: true, data: result });
  } catch (error) {
    console.log(error);
  }
};

const createAdmin = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.createAdmin(req.body);
    res.send({ success: true, data: result });
  } catch (error) {
    console.log(error);
  }
};

export const UserControllers = {
  getAllUsers,
  createAdmin,
};
