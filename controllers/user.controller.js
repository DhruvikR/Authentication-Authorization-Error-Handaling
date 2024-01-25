import pool from "../config/db.config.js";
import { ErrorHandler } from "../middlewares/error.js";
import bcrypt from "bcrypt";
import { jwtTokens } from "../utils/cookie.js";
import cookie from "cookie";
import jwt from "jsonwebtoken";

export const getUser = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    if (result.rowCount == 0) {
      next(new ErrorHandler("No User Found", 400));
    } else {
      res.status(201).json({
        success: true,
        message: `User get successfully!`,
        data: result.rows,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!email?.trim()) {
      next(new ErrorHandler("Please Provide Email", 400));
    } else if (!name?.trim()) {
      next(new ErrorHandler("Please Provide Name", 400));
    } else if (!password?.trim()) {
      next(new ErrorHandler("Please Provide Password", 400));
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result2 = await pool.query("SELECT id FROM users WHERE email = $1", [
      email,
    ]);

    if (result2.rows.length > 0) {
      next(new ErrorHandler("Same Email is Not Valid", 400));
    }
    const result = await pool.query(
      "INSERT INTO users ( name, email ,password) VALUES ($1, $2 ,$3) RETURNING *",
      [name, email, hashedPassword]
    );

    res.status(201).json({
      success: true,
      message: `User Inserted successfully!`,
      userId: result.rows[0].id,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email?.trim()) {
      next(new ErrorHandler("Please Provide Email", 400));
    } else if (!password?.trim()) {
      next(new ErrorHandler("Please Provide Password", 400));
    }

    const result2 = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (result2.rows.length == 0) {
      next(new ErrorHandler("Email is Not Registred", 400));
    }

    const validPassword = await bcrypt.compare(
      password,
      result2.rows[0].password
    );

    if (!validPassword) {
      next(new ErrorHandler("Password is Incorrect", 400));
    }

    let tokens = jwtTokens(result2.rows[0]);

    res.cookie("refresh_token", tokens.refreshToken, { httpOnly: true });
    res.status(201).json({
      success: true,
      message: `user login sucessfully`,
      tokens: tokens,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("refresh_token");
    res.status(201).json({
      success: true,
      message: "User Logout Sucessfully. RefereshToken Deleted.",
    });
  } catch (error) {
    next(error);
  }
};

export const getAccessFromRefresh = async (req, res, next) => {
  try {
    const cookies = cookie.parse(req.headers.cookie || "");

    const refreshToken = cookies.refresh_token;
    if (refreshToken == null) {
      next(new ErrorHandler("Please Provide Refresh_token", 401));
    }

    jwt.verify(
      refreshToken,
      process.env.REFRESH_JWT_SECRET,
      async (error, id) => {
        if (error) {
          next(error);
        }
        let tokens = jwtTokens(id);

        res.cookie("refresh_token", tokens.refreshToken, { httpOnly: true });
        res.status(201).json({
          success: true,
          message: `user login sucessfully`,
          tokens: tokens,
        });
      }
    );
  } catch (error) {
    next(error);
  }
};

export const updateMe = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    if (!email?.trim()) {
      next(new ErrorHandler("Please Provide Email", 400));
    } else if (!name?.trim()) {
      next(new ErrorHandler("Please Provide Name", 400));
    }

    const result3 = await pool.query("SELECT id FROM users WHERE email = $1", [
      email,
    ]);

    if (result3.rows.length > 0) {
      next(new ErrorHandler("Same Email is Not Valid", 400));
    }

    const result = await pool.query(
      "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *",
      [name, email, req.user.id]
    );
    res.status(201).json({
      success: true,
      message: `User update successfully!`,
      data: result.rows[0],
    });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);

    if (result.rowCount == 0) {
      next(new ErrorHandler("No User Found", 400));
    } else {
      res.status(201).json({
        success: true,
        message: `User get successfully!`,
        data: result.rows[0],
      });
    }
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const result2 = await pool.query("SELECT * FROM users WHERE id = $1", [id]);

    if (result2.rowCount == 0) {
      next(new ErrorHandler("No User Found", 400));
    } else if (!email?.trim()) {
      next(new ErrorHandler("Please Provide Email", 400));
    } else if (!name?.trim()) {
      next(new ErrorHandler("Please Provide Name", 400));
    }

    const result3 = await pool.query("SELECT id FROM users WHERE email = $1", [
      email,
    ]);

    if (result3.rows.length > 0) {
      next(new ErrorHandler("Same Email is Not Valid", 400));
    }

    const result = await pool.query(
      "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *",
      [name, email, id]
    );
    res.status(201).json({
      success: true,
      message: `User update successfully!`,
      data: result.rows[0],
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result2 = await pool.query("SELECT * FROM users WHERE id = $1", [id]);

    if (result2.rowCount == 0) {
      next(new ErrorHandler("No User Found", 400));
    }

    const result = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [id]
    );

    res.status(201).json({
      success: true,
      message: `User deleted successfully!`,
      data: result.rows[0].id,
    });
  } catch (error) {
    next(error);
  }
};

export const makeAdmin = async (req, res, next) => {
  try {
    const { id } = req.body;

    const result = await pool.query(
      "UPDATE users SET role='admin' WHERE id = $1",
      [id]
    );

    res.status(201).json({
      sucess: true,
      message: `Admin Created Sucessfully.`,
    });
  } catch (error) {
    next(error);
  }
};

export const makeSuperadmin = async (req, res, next) => {
  try {
    const { id } = req.body;

    const result = await pool.query(
      "UPDATE users SET role='superadmin' WHERE id = $1",
      [id]
    );

    res.status(201).json({
      sucess: true,
      message: `SuperAdmin Created Sucessfully.`,
    });
  } catch (error) {
    next(error);
  }
};
