// Gets post by Author
import { DatabaseSync } from "node:sqlite";

/**
 * @param {DatabaseSync} db - Database object
 * @param {string} author - Name of author we want to query
 * @returns {[Object]} Would return an array of books filtered by title
 */
const getPostsByAuthor = (db, author) => {
  try {
    const authorPosts = db.prepare(`SELECT * FROM books 
WHERE author = '${author}'`);
    return authorPosts.all();
  } catch (err) {
    console.log("=====================");
    console.log("getPostByAuthor");
    console.error(err);
    console.log("=====================");
  }
  return [];
};

export default getPostsByAuthor;

// I am kinda repeating myself here now that I think about it
// maybe I should make it like a case function
// case author would rethrn where author or something like that,
// I would refactor later though
// Maybe
