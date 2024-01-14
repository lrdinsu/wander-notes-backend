import type { ColumnType } from 'kysely';

import type { Difficulty, Role } from './enums.js';

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type StartDate = {
  id: Generated<number>;
  startDate: Timestamp;
  tourId: number;
};
export type Tour = {
  id: Generated<number>;
  name: string;
  duration: number;
  maxGroupSize: number;
  difficulty: Difficulty;
  ratingsAverage: Generated<number>;
  ratingsQuantity: Generated<number>;
  price: number;
  priceDiscount: number | null;
  summary: string;
  description: string | null;
  imageCover: string;
  images: string[];
  createdAt: Generated<Timestamp>;
  isPremium: Generated<boolean>;
};
export type User = {
  id: Generated<number>;
  name: string;
  email: string;
  password: string;
  role: Generated<Role>;
  createdAt: Generated<Timestamp>;
};
export type DB = {
  StartDate: StartDate;
  Tour: Tour;
  User: User;
};
