import { test } from "node:test";
import assert from "node:assert/strict";

import { getPostAtId } from "../util.js";
import { db } from "../db-utils/sqlUtils.js";
import getPostByTitle from "../db-utils/GET-functions/getPostByTitle.js";

test("Returns array of objects per id", () => {
  const result = getPostAtId(1, db);
  const bookTitle = result[0]?.title;
  assert.strictEqual(
    bookTitle,
    "The book of Adam",
    "Title of book should be 'The book of Adam",
  );
});

test("Returns array of books with certain title", () => {
  const result = getPostByTitle(db, "The Orchard Archivist");
  const bookTitle = result[0]?.title;
  assert.strictEqual(bookTitle, "The Orchard Archivist");
});
