import { DatabaseSync } from "node:sqlite";

/**
 * @param {DatabaseSync} db - The SQLite database object
 * @param {string} tag - the Tag we want to search for
 * @returns {[Object] | null} Would return an array of books with similar tags
 */
const getPostByTags = (db, tag) => {
  try {
    const booksByTags = db.prepare(`
SELECT * FROM books, json_each(tags)
WHERE json_each.value = '${tag}'
`);
    return booksByTags;
  } catch (err) {
    console.log(err);
  }
  return null;
};

export default getPostByTags;
