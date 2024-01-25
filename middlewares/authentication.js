import jwt from "jsonwebtoken";
import { ErrorHandler } from "./error.js";
import pool from "../config/db.config.js";
import env from "dotenv";

env.config();

export const authenticateToken = async (req, res, next) => {
  try {
    const headers = req.headers["authorization"];

    const token = headers && headers.split(" ")[1];
    if (token == null) {
      next(new ErrorHandler("Please Provice token for Access", 401));
    }

    jwt.verify(token, process.env.ACCESS_JWT_SECRET, async (error, id) => {
      if (error) {
        next(
          new ErrorHandler("Plaease Give a Valid Token or Token Expired.", 401)
        );
      } else {
        const user = await pool.query("select * from users where id  = $1", [
          id.id,
        ]);
        req.user = user.rows[0];
        next();
      }
    });
  } catch (error) {
    next(error);
  }
};
