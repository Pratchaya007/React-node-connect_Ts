import jwt from 'jsonwebtoken'
import { env } from '../config/env.config.js';

export  interface AccessJwtPayload {
  id: number ;
  role: 'admin' | 'user';
}

interface RefreshJwtPayload {
  id: number
};

export const singnAccessJwt = (payload: AccessJwtPayload) : string =>
  jwt.sign(payload, env.ACCESS_JWT_SECRET, {
    expiresIn: env.ACCESS_JWT_EXPIRES_IN
})

export const verifyAccessJwt = (token: string):AccessJwtPayload  => {
  return  jwt.verify(token, env.ACCESS_JWT_SECRET) as AccessJwtPayload;
}



export const singnRefreshJwt = (payload: RefreshJwtPayload) : string =>
  jwt.sign(payload, env.ACCESS_JWT_SECRET, {
    expiresIn: env.ACCESS_JWT_EXPIRES_IN
})

export const verifyRefreshJwt = (token: string):RefreshJwtPayload  => {
  return  jwt.verify(token, env.REFRESH_JWT_SECRET) as RefreshJwtPayload;
}
