import { User } from '@/db/zod/index.js';

declare global {
  namespace Express {
    interface Request {
      user?: User.omit<'password'>;
    }
  }
}
