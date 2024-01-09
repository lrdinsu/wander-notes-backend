import { createInsertSchema } from 'drizzle-zod';

import { tour } from '@/db/schema.js';

export const insertTourSchema = createInsertSchema(tour);
