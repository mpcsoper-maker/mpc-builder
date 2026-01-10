import { sql } from "@vercel/postgres";

async function main() {
  await sql`
    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      email TEXT NOT NULL,
      parts JSONB NOT NULL,
      total NUMERIC NOT NULL DEFAULT 0,
      notes TEXT NOT NULL DEFAULT '',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `;

  console.log("✅ orders table ready");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
