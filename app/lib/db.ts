import Database from "better-sqlite3";

export const db = new Database("orders.db");

db.prepare(`
  CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    email TEXT,
    parts TEXT,
    total REAL,
    notes TEXT,
    createdAt TEXT
  )
`).run();
