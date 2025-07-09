// server/db.ts
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres'; // ✅ Correct driver for pg
import * as schema from '@shared/schema';
import 'dotenv/config';

if (!process.env.DATABASE_URL) {
  throw new Error(
    'DATABASE_URL must be set. Did you forget to provision a database?',
  );
}

// Local PostgreSQL pool
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Drizzle client for querying with schema
export const db = drizzle(pool, { schema });
