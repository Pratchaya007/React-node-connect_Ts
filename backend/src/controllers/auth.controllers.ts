import type { RequestHandler } from "express";
import { loginSchema, registerSchema } from "../validators/auth.validators.js";
import bcrypt from "bcrypt";
import { env } from "../config/env.config.js";
import { prisma } from "../db/prisma.js";
import { PrismaClientKnownRequestError } from "../db/generated/prisma/internal/prismaNamespace.js";
import {
  singnAccessJwt,
  singnRefreshJwt,
  verifyRefreshJwt,
} from "../utils/token.js";
import type { Request, Response } from "express";
import { getUserPayload } from "../utils/auth.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from 'cloudinary';

const register: RequestHandler = async (req, res) => {
  const data = registerSchema.parse(req.body);
  data.password = await bcrypt.hash(data.password, env.SALT_ROUND);

  try {
    await prisma.user.create({ data });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError && err.code === "P2002") {
      res.status(409).json({ message: "Email already in use" });
      return;
    }
    throw err;
  }

  res.status(201).json({ message: " register successfuly " });
};

const login: RequestHandler = async (req, res) => {
  const { email, password } = loginSchema.parse(req.body);
  const user = await prisma.user.findUnique({
    where: { email, status: true },
  });
  if (!user) {
    //ไม่มีข้อมูล
    return res.status(401).json({ message: " invalid email or password " });
  }
  const isMatch = await bcrypt.compare(password, user.password); //compare คือการเทียบ
  if (!isMatch) {
    //ไม่มีรหัสที่เราเปรียบเทียบ
    return res.status(401).json({ message: " invalid email or password " });
  }

  const access_token = singnAccessJwt({ id: user.id, role: user.role });
  const refresh_token = singnRefreshJwt({ id: user.id }); //❗️
  const { password: pass, ...userWithoutPassword } = user;

  res
    .cookie("refresh_token", refresh_token, {
      //สามารถกำหนด coolie ได้ในนี้
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "strict",
      // maxAge:  env.ACCESS_JWT_COOKIE_MAX_AGE //วันหมดอายุ
      maxAge: env.REFRESH_JWT_COOKIE_MAX_AGE,
      // path: '/auth/refresh' //ส่งเฉพาะ path ที่ refresh เท่านั่น
    })
    .status(200)
    .json({ user: userWithoutPassword, access_token });

  // res.status(200).json({ access_token , user: userWithoutPassword })
};

const getMe = async (req: Request, res: Response) => {
  const payload = getUserPayload(req); // import auth.ts
  const user = await prisma.user.findUnique({
    where: { id: payload.id, status: true },
    omit: { password: true },
  });
  if (!user) {
    res
      .status(403)
      .json({ message: "user has been deleted or user is banned " });
    return;
  }
  res.status(200).json({ user });
};

const logOut: RequestHandler = (req, res) => {
  // fn LogOut
  res.clearCookie("access_token").status(200).json({ message: "Log out" });
};

const refresh: RequestHandler = async (req, res) => {
  const token = req.cookies.refresh_token;
  console.log('token',token) 
  if (typeof token !== "string") {
    res.status(400).json({ message: "token is missing" });
    return;
  }

  try {
    const payload = verifyRefreshJwt(token); //import token.ts
    console.log('payload',payload)
    const user = await prisma.user.findUnique({
      where: { id: payload.id, status: true },
      omit: { password: true },
    });
    if (!user) {
      res.clearCookie("refresh_token", { path: "/auth" });
      res
        .status(403)
        .json({ message: "user has been deleted or user is banned " });
      return;
    }
    const access_token = singnAccessJwt({ id: user.id, role: user.role });
    console.log('token',access_token)
    res.status(200).json({ access_token, user });
  } catch (err) {
    console.log(err)
    if (
      err instanceof jwt.TokenExpiredError ||
      err instanceof jwt.JsonWebTokenError
    ) {
      res.clearCookie("refresh_token", { path: "/auth" });
      res.status(401).json({ message: " invalid token or token espired " });
      return;
    }
    console.error(err);
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

export  const uploadProfileImage : RequestHandler = async (req ,res) => {
  console.log(req.file);
  if (req.file){
    const result = await cloudinary.uploader.upload(req.file?.path)
    console.log(result)
  }
  res.json();
};

export const authController = { register, login, getMe, logOut, refresh , uploadProfileImage };
