export const Difficulty = {
    EASY: "EASY",
    MEDIUM: "MEDIUM",
    DIFFICULT: "DIFFICULT"
} as const;
export type Difficulty = (typeof Difficulty)[keyof typeof Difficulty];
export const Role = {
    USER: "USER",
    PREMIUM_USER: "PREMIUM_USER",
    ADMIN: "ADMIN"
} as const;
export type Role = (typeof Role)[keyof typeof Role];
