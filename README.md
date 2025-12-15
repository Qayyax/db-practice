# Connecting the backend to SQL db

//TODO:

- [x] How to create a working database
- [x] How to make querries in SQL
- [x] How to connect the SQL to Node or Express
- [] Utility functions to make the querries
- [] Python script to create mass insert querries
- [] Paste the notes below in Notion

---

# Notes

```bash
# syntax=docker/dockerfile:1
# Dockerfile

FROM node:lts-alpine # I want to use sqllite in my own situation
WORKDIR /app
COPY . .
RUN yarn install --production
CMD ["node", "src/index.js"]
EXPOSE 3000
```

## Getting started with SQLITE

<https://www.hibit.dev/posts/215/setting-up-sqlite-with-docker-compose>

## Storing array text in sqlite

```bash
CREATE TABLE guests (
    name TEXT,
    likes TEXT -- Stores the array as a JSON string, e.g., '["apples", "oranges"]'
);

INSERT INTO guests VALUES (
    'bob',
    json('["apples", "oranges"]')
);

-- You can even query the JSON data
SELECT name FROM guests, json_each(likes) WHERE json_each.value = 'oranges';

```

## Using node to update SQLITE table

```js
import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync("path");

db.exec("CREATE TABLE users (id INT, name TEXT)");

// and yeah I can do multiple sql execs too
// just remember to put ; at the end of each statement
db.exec(`INSERT INTO books (title, slug, content, author)
VALUES ('The book of Adam', 'the-book-of-adam', 'This is the story of the first time that Adam saw his private area, and thought he was naked, I wonder why he was though', 'Qayyax the great' )
`);

const testBook = db.prepare(
  `SELECT * FROM books WHERE author = 'Qayyax the great'`,
);

console.log(testBook.all());
db.close();
```

## Storing Dates in SQLite

```sql
INSERT INTO datetime_text (d1, d2)
VALUES(datetime('now'),datetime('now', 'localtime'));
```

## Storing array of texts in SQLite

```sql
CREATE TABLE guests (
    name TEXT,
    likes TEXT -- Stores the array as a JSON string, e.g., '["apples", "oranges"]'
);

INSERT INTO guests VALUES (
    'bob',
    json('["apples", "oranges"]')
);

-- You can even query the JSON data
SELECT name FROM guests, json_each(likes) WHERE json_each.value = 'oranges';
```

## Alter table to add new column in SQLite

```sql
ALTER TABLE table_name
ADD COLUMN column_name column_definition

-- example
ALTER TABLE books
ADD COLUMN created_at TEXT;
```
