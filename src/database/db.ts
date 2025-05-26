import Database from "better-sqlite3";
import { join } from "path";

const dbFolder = "./userData";
const dbPath = join(dbFolder, "app.db");

import { existsSync, mkdirSync } from "fs";

if (!existsSync(dbFolder)) {
  mkdirSync(dbFolder, { recursive: true });
}

const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS bills (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    items TEXT NOT NULL,
    price INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    total INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 0,
    price INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`);

const count = db.prepare("SELECT COUNT(*) AS count FROM products").get() as {
  count: number;
};

if (count?.count === 0) {
  db.prepare(
    "INSERT INTO products (name, quantity, price) VALUES (?, ?, ?)"
  ).run("โค้ก", 2, 25);
  db.prepare(
    "INSERT INTO products (name, quantity, price) VALUES (?, ?, ?)"
  ).run("น้ำเปล่า", 3, 10);
}

export { db };
