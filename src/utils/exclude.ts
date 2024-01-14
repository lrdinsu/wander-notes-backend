// Exclude keys from tour
import { Prisma } from '@prisma/client';

type A<T extends string> = T extends `${infer U}ScalarFieldEnum` ? U : never;
type Entity = A<keyof typeof Prisma>;
type Keys<T extends Entity> = Extract<
  keyof (typeof Prisma)[keyof Pick<typeof Prisma, `${T}ScalarFieldEnum`>],
  string
>;

export function exclude<
  ModelName extends Entity,
  FieldName extends Keys<ModelName>,
>(type: ModelName, omit: FieldName[]) {
  type Key = Exclude<Keys<ModelName>, FieldName>;
  type ModelNameMap = Record<Key, true>;
  const result: ModelNameMap = {} as ModelNameMap;
  for (const key in Prisma[`${type}ScalarFieldEnum`]) {
    if (!omit.includes(key as FieldName)) {
      result[key as Key] = true;
    }
  }
  return result;
}
