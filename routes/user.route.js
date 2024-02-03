import express from "express";
import {
  getUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  login,
  getAccessFromRefresh,
  logout,
  updateMe,
  makeAdmin,
  makeSuperadmin,
} from "../controllers/user.controller.js";
import { authenticateToken } from "../middlewares/authentication.js";
import {
  authorizeAdmin,
  authorizeSuperadmin,
} from "../middlewares/admin.authorization.js";

const userRouter = express.Router();

userRouter.get("/", getUser);
userRouter.post("/", createUser);
userRouter.get("/getAccessFromRefresh", getAccessFromRefresh);
userRouter.post("/login", login);
userRouter.post("/logout", authenticateToken, logout);
userRouter.put("/update", authenticateToken, updateMe);
userRouter.post(
  "/makeAdmin",
  authenticateToken,
  authorizeSuperadmin,
  makeAdmin
);
userRouter.post(
  "/makeSuperAdmin",
  authenticateToken,
  authorizeSuperadmin,
  makeSuperadmin
);
userRouter.get("/:id", getUserById);
userRouter.put("/:id", authenticateToken, authorizeAdmin, updateUser);
userRouter.delete("/:id", authenticateToken, authorizeSuperadmin, deleteUser);

export default userRouter;
