// Gets all post
import { DatabaseSync } from "node:sqlite";

/**
 * @param {DatabaseSync} db - Database instance
 * @returns {[Object]} Would return all the books in the db
 */
const getAllPosts = (db) => {
  try {
    const allPost = db.prepare(`
SELECT * FROM books
`);
    return allPost.all();
  } catch (err) {
    console.log("=====================");
    console.log("getAllPosts");
    console.error(err);
    console.log("=====================");
  }
  return [];
};

export default getAllPosts;
