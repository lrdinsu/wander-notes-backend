import { z } from 'zod';

const QueryParamsBaseSchema = z.object({
  page: z.coerce.number().optional(),
  limit: z.coerce.number().optional(),
  sort: z.enum(['price', 'ratingsAverage']).optional(),
  fields: z.string().optional(),
});

export const TourQueryParamsSchema = QueryParamsBaseSchema.merge(
  z.object({
    name: z.string().optional(),
    duration: z.coerce.number().optional(),
    maxGroupSize: z.coerce.number().optional(),
    difficulty: z.enum(['EASY', 'MEDIUM', 'DIFFICULT']).optional(),
    ratingsAverage: z.coerce.number().optional(),
    ratingsQuantity: z.coerce.number().optional(),
    price: z.coerce.number().optional(),
  }),
);
