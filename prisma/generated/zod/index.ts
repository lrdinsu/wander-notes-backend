import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const TourScalarFieldEnumSchema = z.enum(['id','name','duration','maxGroupSize','difficulty','ratingsAverage','ratingsQuantity','price','priceDiscount','summary','description','imageCover','images','createdAt','startDates']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const DifficultySchema = z.enum(['EASY','MEDIUM','DIFFICULT']);

export type DifficultyType = `${z.infer<typeof DifficultySchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// TOUR SCHEMA
/////////////////////////////////////////

export const TourSchema = z.object({
  difficulty: DifficultySchema,
  id: z.number().int(),
  name: z.string(),
  duration: z.number().int(),
  maxGroupSize: z.number().int(),
  ratingsAverage: z.number(),
  ratingsQuantity: z.number().int(),
  price: z.number().int(),
  priceDiscount: z.number().int().nullable(),
  summary: z.string(),
  description: z.string().nullable(),
  imageCover: z.string(),
  images: z.string().array(),
  createdAt: z.coerce.date(),
  startDates: z.coerce.date().array(),
})

export type Tour = z.infer<typeof TourSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// TOUR
//------------------------------------------------------

export const TourSelectSchema: z.ZodType<Prisma.TourSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  duration: z.boolean().optional(),
  maxGroupSize: z.boolean().optional(),
  difficulty: z.boolean().optional(),
  ratingsAverage: z.boolean().optional(),
  ratingsQuantity: z.boolean().optional(),
  price: z.boolean().optional(),
  priceDiscount: z.boolean().optional(),
  summary: z.boolean().optional(),
  description: z.boolean().optional(),
  imageCover: z.boolean().optional(),
  images: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  startDates: z.boolean().optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const TourWhereInputSchema: z.ZodType<Prisma.TourWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TourWhereInputSchema),z.lazy(() => TourWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TourWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TourWhereInputSchema),z.lazy(() => TourWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  duration: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  maxGroupSize: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  difficulty: z.union([ z.lazy(() => EnumDifficultyFilterSchema),z.lazy(() => DifficultySchema) ]).optional(),
  ratingsAverage: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  ratingsQuantity: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  price: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  priceDiscount: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  summary: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  imageCover: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  images: z.lazy(() => StringNullableListFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  startDates: z.lazy(() => DateTimeNullableListFilterSchema).optional()
}).strict();

export const TourOrderByWithRelationInputSchema: z.ZodType<Prisma.TourOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  duration: z.lazy(() => SortOrderSchema).optional(),
  maxGroupSize: z.lazy(() => SortOrderSchema).optional(),
  difficulty: z.lazy(() => SortOrderSchema).optional(),
  ratingsAverage: z.lazy(() => SortOrderSchema).optional(),
  ratingsQuantity: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  priceDiscount: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  summary: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  imageCover: z.lazy(() => SortOrderSchema).optional(),
  images: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  startDates: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TourWhereUniqueInputSchema: z.ZodType<Prisma.TourWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    name: z.string()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    name: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => TourWhereInputSchema),z.lazy(() => TourWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TourWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TourWhereInputSchema),z.lazy(() => TourWhereInputSchema).array() ]).optional(),
  duration: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  maxGroupSize: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  difficulty: z.union([ z.lazy(() => EnumDifficultyFilterSchema),z.lazy(() => DifficultySchema) ]).optional(),
  ratingsAverage: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  ratingsQuantity: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  price: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  priceDiscount: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  summary: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  imageCover: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  images: z.lazy(() => StringNullableListFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  startDates: z.lazy(() => DateTimeNullableListFilterSchema).optional()
}).strict());

export const TourOrderByWithAggregationInputSchema: z.ZodType<Prisma.TourOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  duration: z.lazy(() => SortOrderSchema).optional(),
  maxGroupSize: z.lazy(() => SortOrderSchema).optional(),
  difficulty: z.lazy(() => SortOrderSchema).optional(),
  ratingsAverage: z.lazy(() => SortOrderSchema).optional(),
  ratingsQuantity: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  priceDiscount: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  summary: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  imageCover: z.lazy(() => SortOrderSchema).optional(),
  images: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  startDates: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TourCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => TourAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TourMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TourMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => TourSumOrderByAggregateInputSchema).optional()
}).strict();

export const TourScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TourScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TourScalarWhereWithAggregatesInputSchema),z.lazy(() => TourScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TourScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TourScalarWhereWithAggregatesInputSchema),z.lazy(() => TourScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  duration: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  maxGroupSize: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  difficulty: z.union([ z.lazy(() => EnumDifficultyWithAggregatesFilterSchema),z.lazy(() => DifficultySchema) ]).optional(),
  ratingsAverage: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  ratingsQuantity: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  price: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  priceDiscount: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  summary: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  imageCover: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  images: z.lazy(() => StringNullableListFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  startDates: z.lazy(() => DateTimeNullableListFilterSchema).optional()
}).strict();

export const TourCreateInputSchema: z.ZodType<Prisma.TourCreateInput> = z.object({
  name: z.string(),
  duration: z.number().int(),
  maxGroupSize: z.number().int(),
  difficulty: z.lazy(() => DifficultySchema),
  ratingsAverage: z.number().optional(),
  ratingsQuantity: z.number().int().optional(),
  price: z.number().int(),
  priceDiscount: z.number().int().optional().nullable(),
  summary: z.string(),
  description: z.string().optional().nullable(),
  imageCover: z.string(),
  images: z.union([ z.lazy(() => TourCreateimagesInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  startDates: z.union([ z.lazy(() => TourCreatestartDatesInputSchema),z.coerce.date().array() ]).optional(),
}).strict();

export const TourUncheckedCreateInputSchema: z.ZodType<Prisma.TourUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  duration: z.number().int(),
  maxGroupSize: z.number().int(),
  difficulty: z.lazy(() => DifficultySchema),
  ratingsAverage: z.number().optional(),
  ratingsQuantity: z.number().int().optional(),
  price: z.number().int(),
  priceDiscount: z.number().int().optional().nullable(),
  summary: z.string(),
  description: z.string().optional().nullable(),
  imageCover: z.string(),
  images: z.union([ z.lazy(() => TourCreateimagesInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  startDates: z.union([ z.lazy(() => TourCreatestartDatesInputSchema),z.coerce.date().array() ]).optional(),
}).strict();

export const TourUpdateInputSchema: z.ZodType<Prisma.TourUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  duration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  maxGroupSize: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  difficulty: z.union([ z.lazy(() => DifficultySchema),z.lazy(() => EnumDifficultyFieldUpdateOperationsInputSchema) ]).optional(),
  ratingsAverage: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  ratingsQuantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  priceDiscount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  summary: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageCover: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  images: z.union([ z.lazy(() => TourUpdateimagesInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  startDates: z.union([ z.lazy(() => TourUpdatestartDatesInputSchema),z.coerce.date().array() ]).optional(),
}).strict();

export const TourUncheckedUpdateInputSchema: z.ZodType<Prisma.TourUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  duration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  maxGroupSize: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  difficulty: z.union([ z.lazy(() => DifficultySchema),z.lazy(() => EnumDifficultyFieldUpdateOperationsInputSchema) ]).optional(),
  ratingsAverage: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  ratingsQuantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  priceDiscount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  summary: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageCover: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  images: z.union([ z.lazy(() => TourUpdateimagesInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  startDates: z.union([ z.lazy(() => TourUpdatestartDatesInputSchema),z.coerce.date().array() ]).optional(),
}).strict();

export const TourCreateManyInputSchema: z.ZodType<Prisma.TourCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  duration: z.number().int(),
  maxGroupSize: z.number().int(),
  difficulty: z.lazy(() => DifficultySchema),
  ratingsAverage: z.number().optional(),
  ratingsQuantity: z.number().int().optional(),
  price: z.number().int(),
  priceDiscount: z.number().int().optional().nullable(),
  summary: z.string(),
  description: z.string().optional().nullable(),
  imageCover: z.string(),
  images: z.union([ z.lazy(() => TourCreateimagesInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  startDates: z.union([ z.lazy(() => TourCreatestartDatesInputSchema),z.coerce.date().array() ]).optional(),
}).strict();

export const TourUpdateManyMutationInputSchema: z.ZodType<Prisma.TourUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  duration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  maxGroupSize: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  difficulty: z.union([ z.lazy(() => DifficultySchema),z.lazy(() => EnumDifficultyFieldUpdateOperationsInputSchema) ]).optional(),
  ratingsAverage: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  ratingsQuantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  priceDiscount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  summary: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageCover: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  images: z.union([ z.lazy(() => TourUpdateimagesInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  startDates: z.union([ z.lazy(() => TourUpdatestartDatesInputSchema),z.coerce.date().array() ]).optional(),
}).strict();

export const TourUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TourUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  duration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  maxGroupSize: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  difficulty: z.union([ z.lazy(() => DifficultySchema),z.lazy(() => EnumDifficultyFieldUpdateOperationsInputSchema) ]).optional(),
  ratingsAverage: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  ratingsQuantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  priceDiscount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  summary: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageCover: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  images: z.union([ z.lazy(() => TourUpdateimagesInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  startDates: z.union([ z.lazy(() => TourUpdatestartDatesInputSchema),z.coerce.date().array() ]).optional(),
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const EnumDifficultyFilterSchema: z.ZodType<Prisma.EnumDifficultyFilter> = z.object({
  equals: z.lazy(() => DifficultySchema).optional(),
  in: z.lazy(() => DifficultySchema).array().optional(),
  notIn: z.lazy(() => DifficultySchema).array().optional(),
  not: z.union([ z.lazy(() => DifficultySchema),z.lazy(() => NestedEnumDifficultyFilterSchema) ]).optional(),
}).strict();

export const FloatFilterSchema: z.ZodType<Prisma.FloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const StringNullableListFilterSchema: z.ZodType<Prisma.StringNullableListFilter> = z.object({
  equals: z.string().array().optional().nullable(),
  has: z.string().optional().nullable(),
  hasEvery: z.string().array().optional(),
  hasSome: z.string().array().optional(),
  isEmpty: z.boolean().optional()
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const DateTimeNullableListFilterSchema: z.ZodType<Prisma.DateTimeNullableListFilter> = z.object({
  equals: z.coerce.date().array().optional().nullable(),
  has: z.coerce.date().optional().nullable(),
  hasEvery: z.coerce.date().array().optional(),
  hasSome: z.coerce.date().array().optional(),
  isEmpty: z.boolean().optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const TourCountOrderByAggregateInputSchema: z.ZodType<Prisma.TourCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  duration: z.lazy(() => SortOrderSchema).optional(),
  maxGroupSize: z.lazy(() => SortOrderSchema).optional(),
  difficulty: z.lazy(() => SortOrderSchema).optional(),
  ratingsAverage: z.lazy(() => SortOrderSchema).optional(),
  ratingsQuantity: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  priceDiscount: z.lazy(() => SortOrderSchema).optional(),
  summary: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  imageCover: z.lazy(() => SortOrderSchema).optional(),
  images: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  startDates: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TourAvgOrderByAggregateInputSchema: z.ZodType<Prisma.TourAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  duration: z.lazy(() => SortOrderSchema).optional(),
  maxGroupSize: z.lazy(() => SortOrderSchema).optional(),
  ratingsAverage: z.lazy(() => SortOrderSchema).optional(),
  ratingsQuantity: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  priceDiscount: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TourMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TourMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  duration: z.lazy(() => SortOrderSchema).optional(),
  maxGroupSize: z.lazy(() => SortOrderSchema).optional(),
  difficulty: z.lazy(() => SortOrderSchema).optional(),
  ratingsAverage: z.lazy(() => SortOrderSchema).optional(),
  ratingsQuantity: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  priceDiscount: z.lazy(() => SortOrderSchema).optional(),
  summary: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  imageCover: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TourMinOrderByAggregateInputSchema: z.ZodType<Prisma.TourMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  duration: z.lazy(() => SortOrderSchema).optional(),
  maxGroupSize: z.lazy(() => SortOrderSchema).optional(),
  difficulty: z.lazy(() => SortOrderSchema).optional(),
  ratingsAverage: z.lazy(() => SortOrderSchema).optional(),
  ratingsQuantity: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  priceDiscount: z.lazy(() => SortOrderSchema).optional(),
  summary: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  imageCover: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TourSumOrderByAggregateInputSchema: z.ZodType<Prisma.TourSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  duration: z.lazy(() => SortOrderSchema).optional(),
  maxGroupSize: z.lazy(() => SortOrderSchema).optional(),
  ratingsAverage: z.lazy(() => SortOrderSchema).optional(),
  ratingsQuantity: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  priceDiscount: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const EnumDifficultyWithAggregatesFilterSchema: z.ZodType<Prisma.EnumDifficultyWithAggregatesFilter> = z.object({
  equals: z.lazy(() => DifficultySchema).optional(),
  in: z.lazy(() => DifficultySchema).array().optional(),
  notIn: z.lazy(() => DifficultySchema).array().optional(),
  not: z.union([ z.lazy(() => DifficultySchema),z.lazy(() => NestedEnumDifficultyWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumDifficultyFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumDifficultyFilterSchema).optional()
}).strict();

export const FloatWithAggregatesFilterSchema: z.ZodType<Prisma.FloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const TourCreateimagesInputSchema: z.ZodType<Prisma.TourCreateimagesInput> = z.object({
  set: z.string().array()
}).strict();

export const TourCreatestartDatesInputSchema: z.ZodType<Prisma.TourCreatestartDatesInput> = z.object({
  set: z.coerce.date().array()
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const EnumDifficultyFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumDifficultyFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => DifficultySchema).optional()
}).strict();

export const FloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.FloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const TourUpdateimagesInputSchema: z.ZodType<Prisma.TourUpdateimagesInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const TourUpdatestartDatesInputSchema: z.ZodType<Prisma.TourUpdatestartDatesInput> = z.object({
  set: z.coerce.date().array().optional(),
  push: z.union([ z.coerce.date(),z.coerce.date().array() ]).optional(),
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedEnumDifficultyFilterSchema: z.ZodType<Prisma.NestedEnumDifficultyFilter> = z.object({
  equals: z.lazy(() => DifficultySchema).optional(),
  in: z.lazy(() => DifficultySchema).array().optional(),
  notIn: z.lazy(() => DifficultySchema).array().optional(),
  not: z.union([ z.lazy(() => DifficultySchema),z.lazy(() => NestedEnumDifficultyFilterSchema) ]).optional(),
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedEnumDifficultyWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumDifficultyWithAggregatesFilter> = z.object({
  equals: z.lazy(() => DifficultySchema).optional(),
  in: z.lazy(() => DifficultySchema).array().optional(),
  notIn: z.lazy(() => DifficultySchema).array().optional(),
  not: z.union([ z.lazy(() => DifficultySchema),z.lazy(() => NestedEnumDifficultyWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumDifficultyFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumDifficultyFilterSchema).optional()
}).strict();

export const NestedFloatWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const TourFindFirstArgsSchema: z.ZodType<Prisma.TourFindFirstArgs> = z.object({
  select: TourSelectSchema.optional(),
  where: TourWhereInputSchema.optional(),
  orderBy: z.union([ TourOrderByWithRelationInputSchema.array(),TourOrderByWithRelationInputSchema ]).optional(),
  cursor: TourWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TourScalarFieldEnumSchema,TourScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TourFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TourFindFirstOrThrowArgs> = z.object({
  select: TourSelectSchema.optional(),
  where: TourWhereInputSchema.optional(),
  orderBy: z.union([ TourOrderByWithRelationInputSchema.array(),TourOrderByWithRelationInputSchema ]).optional(),
  cursor: TourWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TourScalarFieldEnumSchema,TourScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TourFindManyArgsSchema: z.ZodType<Prisma.TourFindManyArgs> = z.object({
  select: TourSelectSchema.optional(),
  where: TourWhereInputSchema.optional(),
  orderBy: z.union([ TourOrderByWithRelationInputSchema.array(),TourOrderByWithRelationInputSchema ]).optional(),
  cursor: TourWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TourScalarFieldEnumSchema,TourScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TourAggregateArgsSchema: z.ZodType<Prisma.TourAggregateArgs> = z.object({
  where: TourWhereInputSchema.optional(),
  orderBy: z.union([ TourOrderByWithRelationInputSchema.array(),TourOrderByWithRelationInputSchema ]).optional(),
  cursor: TourWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TourGroupByArgsSchema: z.ZodType<Prisma.TourGroupByArgs> = z.object({
  where: TourWhereInputSchema.optional(),
  orderBy: z.union([ TourOrderByWithAggregationInputSchema.array(),TourOrderByWithAggregationInputSchema ]).optional(),
  by: TourScalarFieldEnumSchema.array(),
  having: TourScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TourFindUniqueArgsSchema: z.ZodType<Prisma.TourFindUniqueArgs> = z.object({
  select: TourSelectSchema.optional(),
  where: TourWhereUniqueInputSchema,
}).strict() ;

export const TourFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TourFindUniqueOrThrowArgs> = z.object({
  select: TourSelectSchema.optional(),
  where: TourWhereUniqueInputSchema,
}).strict() ;

export const TourCreateArgsSchema: z.ZodType<Prisma.TourCreateArgs> = z.object({
  select: TourSelectSchema.optional(),
  data: z.union([ TourCreateInputSchema,TourUncheckedCreateInputSchema ]),
}).strict() ;

export const TourUpsertArgsSchema: z.ZodType<Prisma.TourUpsertArgs> = z.object({
  select: TourSelectSchema.optional(),
  where: TourWhereUniqueInputSchema,
  create: z.union([ TourCreateInputSchema,TourUncheckedCreateInputSchema ]),
  update: z.union([ TourUpdateInputSchema,TourUncheckedUpdateInputSchema ]),
}).strict() ;

export const TourCreateManyArgsSchema: z.ZodType<Prisma.TourCreateManyArgs> = z.object({
  data: z.union([ TourCreateManyInputSchema,TourCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const TourDeleteArgsSchema: z.ZodType<Prisma.TourDeleteArgs> = z.object({
  select: TourSelectSchema.optional(),
  where: TourWhereUniqueInputSchema,
}).strict() ;

export const TourUpdateArgsSchema: z.ZodType<Prisma.TourUpdateArgs> = z.object({
  select: TourSelectSchema.optional(),
  data: z.union([ TourUpdateInputSchema,TourUncheckedUpdateInputSchema ]),
  where: TourWhereUniqueInputSchema,
}).strict() ;

export const TourUpdateManyArgsSchema: z.ZodType<Prisma.TourUpdateManyArgs> = z.object({
  data: z.union([ TourUpdateManyMutationInputSchema,TourUncheckedUpdateManyInputSchema ]),
  where: TourWhereInputSchema.optional(),
}).strict() ;

export const TourDeleteManyArgsSchema: z.ZodType<Prisma.TourDeleteManyArgs> = z.object({
  where: TourWhereInputSchema.optional(),
}).strict() ;