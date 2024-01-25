import { Kysely, PostgresDialect } from 'kysely';
import pg from 'pg';

import { softDelete } from '@/db/extensions/softDelete.js';
import { PrismaClient } from '@prisma/client';

import type { DB } from './types.js';

const { Pool } = pg;

// Prisma
export const prisma = new PrismaClient().$extends(softDelete);

// Kysely
const dialect = new PostgresDialect({
  pool: new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 10,
  }),
});

export const db = new Kysely<DB>({ dialect });
