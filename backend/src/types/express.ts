import 'express';
import type { AccessJwtPayload } from '../utils/token.js';

declare module 'express' {
  interface Request {
    user?: AccessJwtPayload
  }
}