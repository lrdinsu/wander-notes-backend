import { Kysely, PostgresDialect } from 'kysely';
import pg from 'pg';

import { PrismaClient } from '@prisma/client';

import { DB } from './types.js';

const { Pool } = pg;

// Prisma
export const prisma = new PrismaClient().$extends({
  result: {
    tour: {
      durationWeeks: {
        needs: { duration: true },
        compute(tour) {
          return tour.duration / 7;
        },
      },
      slug: {
        needs: { name: true },
        compute(tour) {
          return tour.name.toLowerCase().replace(/ /g, '-');
        },
      },
    },
  },
  query: {
    tour: {},
  },
});

// Kysely
const dialect = new PostgresDialect({
  pool: new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 10,
  }),
});

export const db = new Kysely<DB>({ dialect });
