import { DatabaseSync } from "node:sqlite";

/**
 * @param {DatabaseSync} db - The SQLite database object
 * @param {string} tag - the Tag we want to search for
 * @returns {[Object] | null} Would return an array of books with similar tags
 */
const getPostByTags = (db, tag) => {
  try {
    const booksByTags = db.prepare(`
SELECT books.*
FROM books
JOIN json_each(books.tags) AS tags on tags.value = '${tag}'
`);
    return booksByTags.all();
  } catch (err) {
    console.log(err);
  }
  return [];
};

// Lets fucking gooo, I still don't understand much of this though

export default getPostByTags;
