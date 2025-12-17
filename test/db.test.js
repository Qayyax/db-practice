import { test } from "node:test";
import assert from "node:assert/strict";

import { getPostAtId } from "../util.js";
import { db } from "../db-utils/sqlUtils.js";
import getPostByTitle from "../db-utils/GET-functions/getPostByTitle.js";
import getPostsByAuthor from "../db-utils/GET-functions/getPostByAuthor.js";
import getPostByTags from "../db-utils/GET-functions/getPostsByTags.js";

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
  const result = getPostByTitle(db, "The orChaRd Archivist");
  const bookTitle = result[0]?.title;
  assert.strictEqual(bookTitle.toLowerCase(), "the orchard archivist");
});

test("Returns array of books with certain author", () => {
  const result = getPostsByAuthor(db, "miRiam ochoa");
  const bookAuthor = result[0]?.author;
  assert.strictEqual(bookAuthor.toLowerCase(), "miriam ochoa");
});

test("Return array of books that contains certain tags", () => {
  const result = getPostByTags(db, "sci-fi");
  console.log("########");
  console.log(result);
});
