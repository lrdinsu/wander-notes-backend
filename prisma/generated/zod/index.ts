import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const TourScalarFieldEnumSchema = z.enum(['id','name','duration','maxGroupSize','difficulty','ratingsAverage','ratingsQuantity','price','priceDiscount','summary','description','imageCover','images','createdAt']);

export const StartDateScalarFieldEnumSchema = z.enum(['id','startDate','tourId']);

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
})

export type Tour = z.infer<typeof TourSchema>

// TOUR RELATION SCHEMA
//------------------------------------------------------

export type TourRelations = {
  startDates: StartDateWithRelations[];
};

export type TourWithRelations = z.infer<typeof TourSchema> & TourRelations

export const TourWithRelationsSchema: z.ZodType<TourWithRelations> = TourSchema.merge(z.object({
  startDates: z.lazy(() => StartDateWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// START DATE SCHEMA
/////////////////////////////////////////

export const StartDateSchema = z.object({
  id: z.number().int(),
  startDate: z.coerce.date(),
  tourId: z.number().int(),
})

export type StartDate = z.infer<typeof StartDateSchema>

// START DATE RELATION SCHEMA
//------------------------------------------------------

export type StartDateRelations = {
  tour: TourWithRelations;
};

export type StartDateWithRelations = z.infer<typeof StartDateSchema> & StartDateRelations

export const StartDateWithRelationsSchema: z.ZodType<StartDateWithRelations> = StartDateSchema.merge(z.object({
  tour: z.lazy(() => TourWithRelationsSchema),
}))

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// TOUR
//------------------------------------------------------

export const TourIncludeSchema: z.ZodType<Prisma.TourInclude> = z.object({
  startDates: z.union([z.boolean(),z.lazy(() => StartDateFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TourCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const TourArgsSchema: z.ZodType<Prisma.TourDefaultArgs> = z.object({
  select: z.lazy(() => TourSelectSchema).optional(),
  include: z.lazy(() => TourIncludeSchema).optional(),
}).strict();

export const TourCountOutputTypeArgsSchema: z.ZodType<Prisma.TourCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => TourCountOutputTypeSelectSchema).nullish(),
}).strict();

export const TourCountOutputTypeSelectSchema: z.ZodType<Prisma.TourCountOutputTypeSelect> = z.object({
  startDates: z.boolean().optional(),
}).strict();

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
  startDates: z.union([z.boolean(),z.lazy(() => StartDateFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TourCountOutputTypeArgsSchema)]).optional(),
}).strict()

// START DATE
//------------------------------------------------------

export const StartDateIncludeSchema: z.ZodType<Prisma.StartDateInclude> = z.object({
  tour: z.union([z.boolean(),z.lazy(() => TourArgsSchema)]).optional(),
}).strict()

export const StartDateArgsSchema: z.ZodType<Prisma.StartDateDefaultArgs> = z.object({
  select: z.lazy(() => StartDateSelectSchema).optional(),
  include: z.lazy(() => StartDateIncludeSchema).optional(),
}).strict();

export const StartDateSelectSchema: z.ZodType<Prisma.StartDateSelect> = z.object({
  id: z.boolean().optional(),
  startDate: z.boolean().optional(),
  tourId: z.boolean().optional(),
  tour: z.union([z.boolean(),z.lazy(() => TourArgsSchema)]).optional(),
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
  startDates: z.lazy(() => StartDateListRelationFilterSchema).optional()
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
  startDates: z.lazy(() => StartDateOrderByRelationAggregateInputSchema).optional()
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
  startDates: z.lazy(() => StartDateListRelationFilterSchema).optional()
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
}).strict();

export const StartDateWhereInputSchema: z.ZodType<Prisma.StartDateWhereInput> = z.object({
  AND: z.union([ z.lazy(() => StartDateWhereInputSchema),z.lazy(() => StartDateWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => StartDateWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StartDateWhereInputSchema),z.lazy(() => StartDateWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  startDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  tourId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  tour: z.union([ z.lazy(() => TourRelationFilterSchema),z.lazy(() => TourWhereInputSchema) ]).optional(),
}).strict();

export const StartDateOrderByWithRelationInputSchema: z.ZodType<Prisma.StartDateOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  startDate: z.lazy(() => SortOrderSchema).optional(),
  tourId: z.lazy(() => SortOrderSchema).optional(),
  tour: z.lazy(() => TourOrderByWithRelationInputSchema).optional()
}).strict();

export const StartDateWhereUniqueInputSchema: z.ZodType<Prisma.StartDateWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => StartDateWhereInputSchema),z.lazy(() => StartDateWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => StartDateWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StartDateWhereInputSchema),z.lazy(() => StartDateWhereInputSchema).array() ]).optional(),
  startDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  tourId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  tour: z.union([ z.lazy(() => TourRelationFilterSchema),z.lazy(() => TourWhereInputSchema) ]).optional(),
}).strict());

export const StartDateOrderByWithAggregationInputSchema: z.ZodType<Prisma.StartDateOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  startDate: z.lazy(() => SortOrderSchema).optional(),
  tourId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => StartDateCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => StartDateAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => StartDateMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => StartDateMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => StartDateSumOrderByAggregateInputSchema).optional()
}).strict();

export const StartDateScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.StartDateScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => StartDateScalarWhereWithAggregatesInputSchema),z.lazy(() => StartDateScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => StartDateScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StartDateScalarWhereWithAggregatesInputSchema),z.lazy(() => StartDateScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  startDate: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  tourId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
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
  startDates: z.lazy(() => StartDateCreateNestedManyWithoutTourInputSchema).optional()
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
  startDates: z.lazy(() => StartDateUncheckedCreateNestedManyWithoutTourInputSchema).optional()
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
  startDates: z.lazy(() => StartDateUpdateManyWithoutTourNestedInputSchema).optional()
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
  startDates: z.lazy(() => StartDateUncheckedUpdateManyWithoutTourNestedInputSchema).optional()
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
  createdAt: z.coerce.date().optional()
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
}).strict();

export const StartDateCreateInputSchema: z.ZodType<Prisma.StartDateCreateInput> = z.object({
  startDate: z.coerce.date(),
  tour: z.lazy(() => TourCreateNestedOneWithoutStartDatesInputSchema)
}).strict();

export const StartDateUncheckedCreateInputSchema: z.ZodType<Prisma.StartDateUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  startDate: z.coerce.date(),
  tourId: z.number().int()
}).strict();

export const StartDateUpdateInputSchema: z.ZodType<Prisma.StartDateUpdateInput> = z.object({
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tour: z.lazy(() => TourUpdateOneRequiredWithoutStartDatesNestedInputSchema).optional()
}).strict();

export const StartDateUncheckedUpdateInputSchema: z.ZodType<Prisma.StartDateUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tourId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StartDateCreateManyInputSchema: z.ZodType<Prisma.StartDateCreateManyInput> = z.object({
  id: z.number().int().optional(),
  startDate: z.coerce.date(),
  tourId: z.number().int()
}).strict();

export const StartDateUpdateManyMutationInputSchema: z.ZodType<Prisma.StartDateUpdateManyMutationInput> = z.object({
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StartDateUncheckedUpdateManyInputSchema: z.ZodType<Prisma.StartDateUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tourId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
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

export const StartDateListRelationFilterSchema: z.ZodType<Prisma.StartDateListRelationFilter> = z.object({
  every: z.lazy(() => StartDateWhereInputSchema).optional(),
  some: z.lazy(() => StartDateWhereInputSchema).optional(),
  none: z.lazy(() => StartDateWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const StartDateOrderByRelationAggregateInputSchema: z.ZodType<Prisma.StartDateOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
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
  createdAt: z.lazy(() => SortOrderSchema).optional()
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

export const TourRelationFilterSchema: z.ZodType<Prisma.TourRelationFilter> = z.object({
  is: z.lazy(() => TourWhereInputSchema).optional(),
  isNot: z.lazy(() => TourWhereInputSchema).optional()
}).strict();

export const StartDateCountOrderByAggregateInputSchema: z.ZodType<Prisma.StartDateCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  startDate: z.lazy(() => SortOrderSchema).optional(),
  tourId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StartDateAvgOrderByAggregateInputSchema: z.ZodType<Prisma.StartDateAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tourId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StartDateMaxOrderByAggregateInputSchema: z.ZodType<Prisma.StartDateMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  startDate: z.lazy(() => SortOrderSchema).optional(),
  tourId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StartDateMinOrderByAggregateInputSchema: z.ZodType<Prisma.StartDateMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  startDate: z.lazy(() => SortOrderSchema).optional(),
  tourId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StartDateSumOrderByAggregateInputSchema: z.ZodType<Prisma.StartDateSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tourId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TourCreateimagesInputSchema: z.ZodType<Prisma.TourCreateimagesInput> = z.object({
  set: z.string().array()
}).strict();

export const StartDateCreateNestedManyWithoutTourInputSchema: z.ZodType<Prisma.StartDateCreateNestedManyWithoutTourInput> = z.object({
  create: z.union([ z.lazy(() => StartDateCreateWithoutTourInputSchema),z.lazy(() => StartDateCreateWithoutTourInputSchema).array(),z.lazy(() => StartDateUncheckedCreateWithoutTourInputSchema),z.lazy(() => StartDateUncheckedCreateWithoutTourInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StartDateCreateOrConnectWithoutTourInputSchema),z.lazy(() => StartDateCreateOrConnectWithoutTourInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StartDateCreateManyTourInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => StartDateWhereUniqueInputSchema),z.lazy(() => StartDateWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StartDateUncheckedCreateNestedManyWithoutTourInputSchema: z.ZodType<Prisma.StartDateUncheckedCreateNestedManyWithoutTourInput> = z.object({
  create: z.union([ z.lazy(() => StartDateCreateWithoutTourInputSchema),z.lazy(() => StartDateCreateWithoutTourInputSchema).array(),z.lazy(() => StartDateUncheckedCreateWithoutTourInputSchema),z.lazy(() => StartDateUncheckedCreateWithoutTourInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StartDateCreateOrConnectWithoutTourInputSchema),z.lazy(() => StartDateCreateOrConnectWithoutTourInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StartDateCreateManyTourInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => StartDateWhereUniqueInputSchema),z.lazy(() => StartDateWhereUniqueInputSchema).array() ]).optional(),
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

export const StartDateUpdateManyWithoutTourNestedInputSchema: z.ZodType<Prisma.StartDateUpdateManyWithoutTourNestedInput> = z.object({
  create: z.union([ z.lazy(() => StartDateCreateWithoutTourInputSchema),z.lazy(() => StartDateCreateWithoutTourInputSchema).array(),z.lazy(() => StartDateUncheckedCreateWithoutTourInputSchema),z.lazy(() => StartDateUncheckedCreateWithoutTourInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StartDateCreateOrConnectWithoutTourInputSchema),z.lazy(() => StartDateCreateOrConnectWithoutTourInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => StartDateUpsertWithWhereUniqueWithoutTourInputSchema),z.lazy(() => StartDateUpsertWithWhereUniqueWithoutTourInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StartDateCreateManyTourInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => StartDateWhereUniqueInputSchema),z.lazy(() => StartDateWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => StartDateWhereUniqueInputSchema),z.lazy(() => StartDateWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => StartDateWhereUniqueInputSchema),z.lazy(() => StartDateWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => StartDateWhereUniqueInputSchema),z.lazy(() => StartDateWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => StartDateUpdateWithWhereUniqueWithoutTourInputSchema),z.lazy(() => StartDateUpdateWithWhereUniqueWithoutTourInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => StartDateUpdateManyWithWhereWithoutTourInputSchema),z.lazy(() => StartDateUpdateManyWithWhereWithoutTourInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => StartDateScalarWhereInputSchema),z.lazy(() => StartDateScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const StartDateUncheckedUpdateManyWithoutTourNestedInputSchema: z.ZodType<Prisma.StartDateUncheckedUpdateManyWithoutTourNestedInput> = z.object({
  create: z.union([ z.lazy(() => StartDateCreateWithoutTourInputSchema),z.lazy(() => StartDateCreateWithoutTourInputSchema).array(),z.lazy(() => StartDateUncheckedCreateWithoutTourInputSchema),z.lazy(() => StartDateUncheckedCreateWithoutTourInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StartDateCreateOrConnectWithoutTourInputSchema),z.lazy(() => StartDateCreateOrConnectWithoutTourInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => StartDateUpsertWithWhereUniqueWithoutTourInputSchema),z.lazy(() => StartDateUpsertWithWhereUniqueWithoutTourInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StartDateCreateManyTourInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => StartDateWhereUniqueInputSchema),z.lazy(() => StartDateWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => StartDateWhereUniqueInputSchema),z.lazy(() => StartDateWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => StartDateWhereUniqueInputSchema),z.lazy(() => StartDateWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => StartDateWhereUniqueInputSchema),z.lazy(() => StartDateWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => StartDateUpdateWithWhereUniqueWithoutTourInputSchema),z.lazy(() => StartDateUpdateWithWhereUniqueWithoutTourInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => StartDateUpdateManyWithWhereWithoutTourInputSchema),z.lazy(() => StartDateUpdateManyWithWhereWithoutTourInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => StartDateScalarWhereInputSchema),z.lazy(() => StartDateScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TourCreateNestedOneWithoutStartDatesInputSchema: z.ZodType<Prisma.TourCreateNestedOneWithoutStartDatesInput> = z.object({
  create: z.union([ z.lazy(() => TourCreateWithoutStartDatesInputSchema),z.lazy(() => TourUncheckedCreateWithoutStartDatesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TourCreateOrConnectWithoutStartDatesInputSchema).optional(),
  connect: z.lazy(() => TourWhereUniqueInputSchema).optional()
}).strict();

export const TourUpdateOneRequiredWithoutStartDatesNestedInputSchema: z.ZodType<Prisma.TourUpdateOneRequiredWithoutStartDatesNestedInput> = z.object({
  create: z.union([ z.lazy(() => TourCreateWithoutStartDatesInputSchema),z.lazy(() => TourUncheckedCreateWithoutStartDatesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TourCreateOrConnectWithoutStartDatesInputSchema).optional(),
  upsert: z.lazy(() => TourUpsertWithoutStartDatesInputSchema).optional(),
  connect: z.lazy(() => TourWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TourUpdateToOneWithWhereWithoutStartDatesInputSchema),z.lazy(() => TourUpdateWithoutStartDatesInputSchema),z.lazy(() => TourUncheckedUpdateWithoutStartDatesInputSchema) ]).optional(),
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

export const StartDateCreateWithoutTourInputSchema: z.ZodType<Prisma.StartDateCreateWithoutTourInput> = z.object({
  startDate: z.coerce.date()
}).strict();

export const StartDateUncheckedCreateWithoutTourInputSchema: z.ZodType<Prisma.StartDateUncheckedCreateWithoutTourInput> = z.object({
  id: z.number().int().optional(),
  startDate: z.coerce.date()
}).strict();

export const StartDateCreateOrConnectWithoutTourInputSchema: z.ZodType<Prisma.StartDateCreateOrConnectWithoutTourInput> = z.object({
  where: z.lazy(() => StartDateWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => StartDateCreateWithoutTourInputSchema),z.lazy(() => StartDateUncheckedCreateWithoutTourInputSchema) ]),
}).strict();

export const StartDateCreateManyTourInputEnvelopeSchema: z.ZodType<Prisma.StartDateCreateManyTourInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => StartDateCreateManyTourInputSchema),z.lazy(() => StartDateCreateManyTourInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const StartDateUpsertWithWhereUniqueWithoutTourInputSchema: z.ZodType<Prisma.StartDateUpsertWithWhereUniqueWithoutTourInput> = z.object({
  where: z.lazy(() => StartDateWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => StartDateUpdateWithoutTourInputSchema),z.lazy(() => StartDateUncheckedUpdateWithoutTourInputSchema) ]),
  create: z.union([ z.lazy(() => StartDateCreateWithoutTourInputSchema),z.lazy(() => StartDateUncheckedCreateWithoutTourInputSchema) ]),
}).strict();

export const StartDateUpdateWithWhereUniqueWithoutTourInputSchema: z.ZodType<Prisma.StartDateUpdateWithWhereUniqueWithoutTourInput> = z.object({
  where: z.lazy(() => StartDateWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => StartDateUpdateWithoutTourInputSchema),z.lazy(() => StartDateUncheckedUpdateWithoutTourInputSchema) ]),
}).strict();

export const StartDateUpdateManyWithWhereWithoutTourInputSchema: z.ZodType<Prisma.StartDateUpdateManyWithWhereWithoutTourInput> = z.object({
  where: z.lazy(() => StartDateScalarWhereInputSchema),
  data: z.union([ z.lazy(() => StartDateUpdateManyMutationInputSchema),z.lazy(() => StartDateUncheckedUpdateManyWithoutTourInputSchema) ]),
}).strict();

export const StartDateScalarWhereInputSchema: z.ZodType<Prisma.StartDateScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => StartDateScalarWhereInputSchema),z.lazy(() => StartDateScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => StartDateScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StartDateScalarWhereInputSchema),z.lazy(() => StartDateScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  startDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  tourId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const TourCreateWithoutStartDatesInputSchema: z.ZodType<Prisma.TourCreateWithoutStartDatesInput> = z.object({
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
  createdAt: z.coerce.date().optional()
}).strict();

export const TourUncheckedCreateWithoutStartDatesInputSchema: z.ZodType<Prisma.TourUncheckedCreateWithoutStartDatesInput> = z.object({
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
  createdAt: z.coerce.date().optional()
}).strict();

export const TourCreateOrConnectWithoutStartDatesInputSchema: z.ZodType<Prisma.TourCreateOrConnectWithoutStartDatesInput> = z.object({
  where: z.lazy(() => TourWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TourCreateWithoutStartDatesInputSchema),z.lazy(() => TourUncheckedCreateWithoutStartDatesInputSchema) ]),
}).strict();

export const TourUpsertWithoutStartDatesInputSchema: z.ZodType<Prisma.TourUpsertWithoutStartDatesInput> = z.object({
  update: z.union([ z.lazy(() => TourUpdateWithoutStartDatesInputSchema),z.lazy(() => TourUncheckedUpdateWithoutStartDatesInputSchema) ]),
  create: z.union([ z.lazy(() => TourCreateWithoutStartDatesInputSchema),z.lazy(() => TourUncheckedCreateWithoutStartDatesInputSchema) ]),
  where: z.lazy(() => TourWhereInputSchema).optional()
}).strict();

export const TourUpdateToOneWithWhereWithoutStartDatesInputSchema: z.ZodType<Prisma.TourUpdateToOneWithWhereWithoutStartDatesInput> = z.object({
  where: z.lazy(() => TourWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => TourUpdateWithoutStartDatesInputSchema),z.lazy(() => TourUncheckedUpdateWithoutStartDatesInputSchema) ]),
}).strict();

export const TourUpdateWithoutStartDatesInputSchema: z.ZodType<Prisma.TourUpdateWithoutStartDatesInput> = z.object({
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
}).strict();

export const TourUncheckedUpdateWithoutStartDatesInputSchema: z.ZodType<Prisma.TourUncheckedUpdateWithoutStartDatesInput> = z.object({
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
}).strict();

export const StartDateCreateManyTourInputSchema: z.ZodType<Prisma.StartDateCreateManyTourInput> = z.object({
  id: z.number().int().optional(),
  startDate: z.coerce.date()
}).strict();

export const StartDateUpdateWithoutTourInputSchema: z.ZodType<Prisma.StartDateUpdateWithoutTourInput> = z.object({
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StartDateUncheckedUpdateWithoutTourInputSchema: z.ZodType<Prisma.StartDateUncheckedUpdateWithoutTourInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StartDateUncheckedUpdateManyWithoutTourInputSchema: z.ZodType<Prisma.StartDateUncheckedUpdateManyWithoutTourInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const TourFindFirstArgsSchema: z.ZodType<Prisma.TourFindFirstArgs> = z.object({
  select: TourSelectSchema.optional(),
  include: TourIncludeSchema.optional(),
  where: TourWhereInputSchema.optional(),
  orderBy: z.union([ TourOrderByWithRelationInputSchema.array(),TourOrderByWithRelationInputSchema ]).optional(),
  cursor: TourWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TourScalarFieldEnumSchema,TourScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TourFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TourFindFirstOrThrowArgs> = z.object({
  select: TourSelectSchema.optional(),
  include: TourIncludeSchema.optional(),
  where: TourWhereInputSchema.optional(),
  orderBy: z.union([ TourOrderByWithRelationInputSchema.array(),TourOrderByWithRelationInputSchema ]).optional(),
  cursor: TourWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TourScalarFieldEnumSchema,TourScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TourFindManyArgsSchema: z.ZodType<Prisma.TourFindManyArgs> = z.object({
  select: TourSelectSchema.optional(),
  include: TourIncludeSchema.optional(),
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
  include: TourIncludeSchema.optional(),
  where: TourWhereUniqueInputSchema,
}).strict() ;

export const TourFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TourFindUniqueOrThrowArgs> = z.object({
  select: TourSelectSchema.optional(),
  include: TourIncludeSchema.optional(),
  where: TourWhereUniqueInputSchema,
}).strict() ;

export const StartDateFindFirstArgsSchema: z.ZodType<Prisma.StartDateFindFirstArgs> = z.object({
  select: StartDateSelectSchema.optional(),
  include: StartDateIncludeSchema.optional(),
  where: StartDateWhereInputSchema.optional(),
  orderBy: z.union([ StartDateOrderByWithRelationInputSchema.array(),StartDateOrderByWithRelationInputSchema ]).optional(),
  cursor: StartDateWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StartDateScalarFieldEnumSchema,StartDateScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const StartDateFindFirstOrThrowArgsSchema: z.ZodType<Prisma.StartDateFindFirstOrThrowArgs> = z.object({
  select: StartDateSelectSchema.optional(),
  include: StartDateIncludeSchema.optional(),
  where: StartDateWhereInputSchema.optional(),
  orderBy: z.union([ StartDateOrderByWithRelationInputSchema.array(),StartDateOrderByWithRelationInputSchema ]).optional(),
  cursor: StartDateWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StartDateScalarFieldEnumSchema,StartDateScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const StartDateFindManyArgsSchema: z.ZodType<Prisma.StartDateFindManyArgs> = z.object({
  select: StartDateSelectSchema.optional(),
  include: StartDateIncludeSchema.optional(),
  where: StartDateWhereInputSchema.optional(),
  orderBy: z.union([ StartDateOrderByWithRelationInputSchema.array(),StartDateOrderByWithRelationInputSchema ]).optional(),
  cursor: StartDateWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StartDateScalarFieldEnumSchema,StartDateScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const StartDateAggregateArgsSchema: z.ZodType<Prisma.StartDateAggregateArgs> = z.object({
  where: StartDateWhereInputSchema.optional(),
  orderBy: z.union([ StartDateOrderByWithRelationInputSchema.array(),StartDateOrderByWithRelationInputSchema ]).optional(),
  cursor: StartDateWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const StartDateGroupByArgsSchema: z.ZodType<Prisma.StartDateGroupByArgs> = z.object({
  where: StartDateWhereInputSchema.optional(),
  orderBy: z.union([ StartDateOrderByWithAggregationInputSchema.array(),StartDateOrderByWithAggregationInputSchema ]).optional(),
  by: StartDateScalarFieldEnumSchema.array(),
  having: StartDateScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const StartDateFindUniqueArgsSchema: z.ZodType<Prisma.StartDateFindUniqueArgs> = z.object({
  select: StartDateSelectSchema.optional(),
  include: StartDateIncludeSchema.optional(),
  where: StartDateWhereUniqueInputSchema,
}).strict() ;

export const StartDateFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.StartDateFindUniqueOrThrowArgs> = z.object({
  select: StartDateSelectSchema.optional(),
  include: StartDateIncludeSchema.optional(),
  where: StartDateWhereUniqueInputSchema,
}).strict() ;

export const TourCreateArgsSchema: z.ZodType<Prisma.TourCreateArgs> = z.object({
  select: TourSelectSchema.optional(),
  include: TourIncludeSchema.optional(),
  data: z.union([ TourCreateInputSchema,TourUncheckedCreateInputSchema ]),
}).strict() ;

export const TourUpsertArgsSchema: z.ZodType<Prisma.TourUpsertArgs> = z.object({
  select: TourSelectSchema.optional(),
  include: TourIncludeSchema.optional(),
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
  include: TourIncludeSchema.optional(),
  where: TourWhereUniqueInputSchema,
}).strict() ;

export const TourUpdateArgsSchema: z.ZodType<Prisma.TourUpdateArgs> = z.object({
  select: TourSelectSchema.optional(),
  include: TourIncludeSchema.optional(),
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

export const StartDateCreateArgsSchema: z.ZodType<Prisma.StartDateCreateArgs> = z.object({
  select: StartDateSelectSchema.optional(),
  include: StartDateIncludeSchema.optional(),
  data: z.union([ StartDateCreateInputSchema,StartDateUncheckedCreateInputSchema ]),
}).strict() ;

export const StartDateUpsertArgsSchema: z.ZodType<Prisma.StartDateUpsertArgs> = z.object({
  select: StartDateSelectSchema.optional(),
  include: StartDateIncludeSchema.optional(),
  where: StartDateWhereUniqueInputSchema,
  create: z.union([ StartDateCreateInputSchema,StartDateUncheckedCreateInputSchema ]),
  update: z.union([ StartDateUpdateInputSchema,StartDateUncheckedUpdateInputSchema ]),
}).strict() ;

export const StartDateCreateManyArgsSchema: z.ZodType<Prisma.StartDateCreateManyArgs> = z.object({
  data: z.union([ StartDateCreateManyInputSchema,StartDateCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const StartDateDeleteArgsSchema: z.ZodType<Prisma.StartDateDeleteArgs> = z.object({
  select: StartDateSelectSchema.optional(),
  include: StartDateIncludeSchema.optional(),
  where: StartDateWhereUniqueInputSchema,
}).strict() ;

export const StartDateUpdateArgsSchema: z.ZodType<Prisma.StartDateUpdateArgs> = z.object({
  select: StartDateSelectSchema.optional(),
  include: StartDateIncludeSchema.optional(),
  data: z.union([ StartDateUpdateInputSchema,StartDateUncheckedUpdateInputSchema ]),
  where: StartDateWhereUniqueInputSchema,
}).strict() ;

export const StartDateUpdateManyArgsSchema: z.ZodType<Prisma.StartDateUpdateManyArgs> = z.object({
  data: z.union([ StartDateUpdateManyMutationInputSchema,StartDateUncheckedUpdateManyInputSchema ]),
  where: StartDateWhereInputSchema.optional(),
}).strict() ;

export const StartDateDeleteManyArgsSchema: z.ZodType<Prisma.StartDateDeleteManyArgs> = z.object({
  where: StartDateWhereInputSchema.optional(),
}).strict() ;