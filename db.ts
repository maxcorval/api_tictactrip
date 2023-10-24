// database.ts
import sqlite3 from 'sqlite3';

const db = new sqlite3.Database(':memory:');

db.run('CREATE TABLE tokens (email TEXT, token TEXT)');

function generateUniqueToken() {
  return 'your-unique-token'; // C'est bien de laisser cette fonction dans database.ts
}

export { db, generateUniqueToken };
