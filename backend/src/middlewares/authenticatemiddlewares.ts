import type { NextFunction, Request, Response } from "express";
import { verifyAccessJwt } from "../utils/token.js";
import jwt from "jsonwebtoken";

// //หน้าที่คือการตรวจสอบ token มาดึงข้อมูลจาก server โดยใช้งานใน cookie
// export const authenticate = (req: Request ,res: Response , next: NextFunction) => {
//   const accessToken = req.cookies.access_token
//   if (typeof accessToken !== 'string'){ // check token form cookie type === string!
//     return res.status(400).json({message: 'token is missing'})
//   }
//   try{
//     const payload = verifyAccessJwt(accessToken); //import token.ts
//     req.user = payload ;
//     next() //ไปทำงานต่อได้ถ้าผ่าน
//   }catch (err){
//     // check Error in Jsonwebtoken 2 type
//     if (err instanceof jwt.TokenExpiredError || err instanceof jwt.JsonWebTokenError){
//       res.clearCookie('access_token')
//       res.status(401).json({message : ' invalid token or token espired '})
//     }
//     throw err ;
//   }
// }

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  //exteact access token from bearer authorzation header (Bearer access_token)
  const [bearer, token] = req.headers.authorization?.split(' ') ?? [];
  if (bearer !== "Bearer" || !token) {
    return res
      .status(400)
      .json({ message: "invalid authorization scheme or token is missing", errCode: 'INVALID_AUTHORIZATION_HEADER' });
  }
  try {
    const payload = verifyAccessJwt(token);
    req.user = payload;
    next();
  } catch (err) {
    if (
      err instanceof jwt.TokenExpiredError ||
      err instanceof jwt.JsonWebTokenError
    ) {
      //TokenExpiredError => หมดอายุ  JsonWebTokenError => invalid
      return res
        .status(401)
        .json({ message: " invalid token or token has been expired ", errcode: 'INVALID_ACCESS_TOKEN' });
    }
    throw err;
  }
};
