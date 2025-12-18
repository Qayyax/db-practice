import { DatabaseSync } from "node:sqlite";
import { getSlugForTitle } from "../../util";
/**
 * @typedef {Object} Book
 * @property {string} title - title of the book
 * @property {string} author - author of the book
 * @property {[string]} tags - json array of tags for the book
 * @property {string} content - content of the book
 *
 * @param {DatabaseSync} db - The database instance
 * @param {Book} bookData - The object of the book
 */
const createNewPost = (db, bookData) => {
  // insert into books (title, slug, content, author, tags, created_at) values(titlevalue, sluval, content, author, tags)
  const { title, author, tags, content } = bookData;
  const slug = getSlugForTitle(title);
  const newPostQuerry = db.prepare(`
INSERT INTO books (title, slug, content, author, tags, created_at)
VALUES('${title}', '${slug}', '${content}', '${author}', json('${tags}'), datetime('now'))
`);
  return newPostQuerry.all();
};

export default createNewPost;
