import { Database } from "bun:sqlite";

const db = new Database("store");
const query = db.query("select 'Hello world' as message;");
query.get();
