import jwt from 'jsonwebtoken'
import { env } from '../config/env.config.js';

interface AccessJwtPayload {
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

export const singnRefreshJwt = (payload: RefreshJwtPayload) : string =>
  jwt.sign(payload, env.ACCESS_JWT_SECRET, {
    expiresIn: env.ACCESS_JWT_EXPIRES_IN
})
  
