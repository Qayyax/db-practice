// Gets post by title
import { DatabaseSync } from "node:sqlite";

/**
 * @param {DatabaseSync} db - Database object
 * @param {string} title - title of book we want to query
 * @returns {[Object]} Would return an array of books filtered by title
 */
const getPostByTitle = (db, title) => {
  try {
    const titlePosts = db.prepare(`SELECT * FROM books 
WHERE title = '${title}'`);
    return titlePosts.all();
  } catch (err) {
    console.log("=====================");
    console.log("getPostByTitle");
    console.error(err);
    console.log("=====================");
  }
  return [];
};

export default getPostByTitle;
