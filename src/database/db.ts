import { Database } from "bun:sqlite";
import { join } from "path";

const dbFolder = "./userData";
const dbPath = join(dbFolder, "app.db");

try {
  await Bun.write(dbPath, "");
} catch (err) {
  console.warn(
    "Could not create DB file (might already exist):",
    err instanceof Error ? err.message : err
  );
}

const db = new Database(dbPath);

db.run(`
  CREATE TABLE IF NOT EXISTS bills (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    items TEXT NOT NULL,
    price INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    total INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`);

db.run(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 0,
    price INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`);

const count = db.query("SELECT COUNT(*) AS count FROM products").get() as {
  count: number;
};

if (count?.count === 0) {
  db.run("INSERT INTO products (name, quantity, price) VALUES (?, ?)", [
    "โค้ก",
    2,
    25,
  ]);
  db.run("INSERT INTO products (name, quantity, price) VALUES (?, ?)", [
    "น้ำเปล่า",
    3,
    10,
  ]);
}

export default db;
