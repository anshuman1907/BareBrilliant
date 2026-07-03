import { Pool } from "pg";

export function createDbPool(connectionString: string): Pool {
  return new Pool({ connectionString });
}

export const dbPool = createDbPool(
  process.env["DATABASE_URL"] ?? "postgres://barebrilliant:barebrilliant@localhost:5432/barebrilliant"
);
