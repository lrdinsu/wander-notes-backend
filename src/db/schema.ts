import {
  doublePrecision,
  integer,
  pgEnum,
  pgTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

export const difficultyEnum = pgEnum('difficulty', [
  'easy',
  'medium',
  'difficult',
]);

export const tour = pgTable('tour', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 40 }).notNull().unique(),
  duration: integer('duration').notNull(),
  maxGroupSize: integer('max_group_size').notNull(),
  difficulty: difficultyEnum('difficulty').notNull(),
  ratingsAverage: doublePrecision('rating_average').default(4.5),
  ratingsQuantity: integer('rating_quantity').default(0),
  price: integer('price').notNull(),
  priceDiscount: integer('price_discount'),
  summary: varchar('summery', { length: 200 }).notNull(),
  description: varchar('description', { length: 1000 }),
  imageCover: varchar('image_cover', { length: 100 }).notNull(),
  images: varchar('images', { length: 100 }).array(),
  createdAt: timestamp('created_at', {
    withTimezone: true,
    mode: 'string',
    precision: 0,
  })
    .notNull()
    .defaultNow(),
  startDates: timestamp('start_dates', {
    withTimezone: true,
    mode: 'string',
    precision: 0,
  })
    .array()
    .notNull(),
});
