import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

import type { Difficulty, Role } from "./enums";

export type Profile = {
    id: Generated<number>;
    firstName: string | null;
    lastName: string | null;
    bio: string | null;
    photo: string | null;
    userId: number;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp;
};
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
    /**
     * @zod.number.min(0).max(5)
     */
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
    /**
     * @zod.string.email()
     */
    email: string;
    /**
     * @zod.string.min(8).max(20)
     */
    password: string;
    role: Generated<Role>;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp;
};
export type DB = {
    profile: Profile;
    start_date: StartDate;
    tour: Tour;
    user: User;
};
