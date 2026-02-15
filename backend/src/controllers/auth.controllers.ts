import type { RequestHandler } from "express";
import { loginSchema, registerSchema } from "../validators/auth.validators.js";
import bcrypt from 'bcrypt'
import { env } from "../config/env.config.js";
import { prisma } from "../db/prisma.js";
import { PrismaClientKnownRequestError } from "../db/generated/prisma/internal/prismaNamespace.js";
import { singnAccessJwt, singnRefreshJwt } from "../utils/token.js";

const register: RequestHandler = async (req , res) => {
  const  data = registerSchema.parse(req.body)
  data.password = await bcrypt.hash(data.password, env.SALT_ROUND)

  try{
    await prisma.user.create({ data })
  }catch (err){
    if (err instanceof PrismaClientKnownRequestError && err.code === 'P2002'){
      res.status(409).json({message: 'Email already in use'})
      return;
    }
    throw err ;
  }

    res.status(201).json({message: ' register successfuly '})

}

const login: RequestHandler = async (req , res) => {
  const {email ,password} = loginSchema.parse(req.body);
  const user = await prisma.user.findUnique({
    where: {email ,status: true}
  })
  if (!user){ //ไม่มีข้อมูล
    return  res.status(409).json({message: ' invalid email or password '})
  }
  const isMatch = await bcrypt.compare(password , user.password)//compare คือการเทียบ
  if (!isMatch){//ไม่มีรหัสที่เราเปรียบเทียบ
    return res.status(401).json({message : ' invalid email or password '})
  }

  const access_token = singnAccessJwt({id: user.id , role: user.role});
  const refresh_token = singnRefreshJwt({id: user.id});
  const {password: pass , ...userWithoutPassword} = user;

  res.status(200).json({ access_token , user: userWithoutPassword })
}

export const authController = {register , login}