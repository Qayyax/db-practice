import { DatabaseSync } from "node:sqlite";

const DBPATH = "./sqlite_practice/first-database.db";
export const db = new DatabaseSync(DBPATH);

// db.exec(`
// CREATE TABLE IF NOT EXISTS books (
// id INTEGER PRIMARY KEY,
// title TEXT,
// slug TEXT,
// content TEXT,
// author TEXT,
// tags TEXT,
// created_at TEXT
// )
// `);

// const testBook = db.prepare(
//   `SELECT * FROM books WHERE author = 'Qayyax the great'`,
// );
// console.log(testBook.all());
// const testBook = db.prepare(`SELECT * FROM books
// WHERE id = 1
// `);
// console.log(testBook.all());

// db.close();

// What util functions do I need
// Get ideas from the rest apis
// would continue tomorrow,
// Thanks for watching
//
