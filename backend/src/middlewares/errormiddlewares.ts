import type { ErrorRequestHandler } from "express";
import { env } from "../config/env.config.js";

export const error: ErrorRequestHandler = (err , req , res , next) => {
  let message = err instanceof Error ? err.message : 'unexpect Error occurred' 
  if (env.NODE_ENV === 'production') message = 'internal server error' // ควบคุมการแสดงผล error ในการโชว์ออกไปแบบให้ภายนอกภายใน
  res.status(500).json({ message })
}