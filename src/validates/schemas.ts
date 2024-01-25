import { z } from 'zod';

import { TourSchema, UserSchema } from '@/db/zod/index.js';

// Tour
const QueryParamsBaseSchema = z.object({
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().optional(),
  sort: z.string().optional(),
  fields: z.string().optional(),
});

function createRangeSchema() {
  return z.union(
    [
      z
        .object({
          gte: z.coerce.number().optional(),
          lte: z.coerce.number().optional(),
          gt: z.coerce.number().optional(),
          lt: z.coerce.number().optional(),
        })
        .optional(),
      z.coerce.number(),
    ],
    {
      errorMap: () => ({
        message:
          'Input needs to be a number or an object with one of the following keys: gte, lte, gt, lt.',
      }),
    },
  );
}

export const TourQueryParamsSchema = TourSchema.extend({
  duration: createRangeSchema(),
  maxGroupSize: createRangeSchema(),
  price: createRangeSchema(),
  ratingsAverage: createRangeSchema(),
  ratingsQuantity: createRangeSchema(),
})
  .partial()
  .merge(QueryParamsBaseSchema)
  .omit({
    images: true,
  });

// User
export const UserLoginSchema = UserSchema.pick({
  email: true,
  password: true,
});

export const UserEmailSchema = UserSchema.pick({ email: true });

export const UserPasswordSchema = UserSchema.pick({ password: true });

export const UserResetPasswordSchema = z.object({
  currentPassword: z.string().min(8).max(20),
  newPassword: z.string().min(8).max(20),
});
