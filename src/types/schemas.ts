import { z } from 'zod';

import { TourSchema } from '../../prisma/generated/zod/index.js';

const QueryParamsBaseSchema = z.object({
  page: z.coerce.number().optional(),
  limit: z.coerce.number().optional(),
  sort: z.string().optional(),
  fields: z.string().optional(),
});

function createRangeSchema() {
  return z
    .object({
      gte: z.coerce.number().optional(),
      lte: z.coerce.number().optional(),
      gt: z.coerce.number().optional(),
      lt: z.coerce.number().optional(),
    })
    .optional()
    .or(z.coerce.number().optional());
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
    startDates: true,
  });
