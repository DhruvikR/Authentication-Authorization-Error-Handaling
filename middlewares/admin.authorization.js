import { ErrorHandler } from "./error.js";
import env from "dotenv";

env.config();

export const authorizeAdmin = async (req, res, next) => {
  try {
    const user = req.user;
    if (
      user.role == process.env.ADMIN_ROLE ||
      user.role == process.env.SUPERADMIN_ROLE
    ) {
      next();
    } else {
      next(new ErrorHandler("You are can't able to access this api.", 400));
    }
  } catch (error) {
    next(error);
  }
};

export const authorizeSuperadmin = async (req, res, next) => {
  try {
    const user = req.user;

    if (user.role == process.env.SUPERADMIN_ROLE) {
      next();
    } else {
      next(new ErrorHandler("You are can't able to access this api.", 400));
    }
  } catch (error) {
    next(error);
  }
};
