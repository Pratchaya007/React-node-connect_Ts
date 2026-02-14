import type { RequestHandler } from "express";

const register: RequestHandler = (req , res) => {
  setTimeout(() => {
    res.status(201).json({message: ' register successfuly '})
  },5000)
}

export const authController = {register}