import { sql } from "@vercel/postgres";

async function run() {
  await sql`
    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      email TEXT,
      parts JSONB,
      total INTEGER,
      notes TEXT,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `;
  console.log("DB ready");
}

run();
