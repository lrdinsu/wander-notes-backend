export const Difficulty = {
    EASY: "EASY",
    MEDIUM: "MEDIUM",
    DIFFICULT: "DIFFICULT"
} as const;
export type Difficulty = (typeof Difficulty)[keyof typeof Difficulty];
