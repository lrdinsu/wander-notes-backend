import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL!;

const migrationConnection = postgres(connectionString, { max: 1 });

async function main() {
  await migrate(drizzle(migrationConnection), { migrationsFolder: 'drizzle' });
  await migrationConnection.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
