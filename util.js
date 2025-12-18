import posts from "./data.js";
import { DatabaseSync } from "node:sqlite";
import getPostByTitle from "./db-utils/GET-functions/getPostByTitle.js";
import getPostsByAuthor from "./db-utils/GET-functions/getPostByAuthor.js";
import getPostByTags from "./db-utils/GET-functions/getPostsByTags.js";

/**
 * @typedef {Object} Query
 * @property {string} title - title of post
 * @property {string} author - author of post
 * @property {[string]} tags - array of tags
 *
 * This returns an array of posts where the following query matches
 * title, author, any tags[]
 * @param {DatabaseSync} db
 * @param {Query} query
 * @returns {[Object]} The returned filter of posts from query
 */
export const getPostQuery = (db, query) => {
  const { title, author, tags } = query;

  const emptyArrayBitches = [];
  if (title) {
    emptyArrayBitches.push(...getPostByTitle(db, title));
  }
  if (author) {
    emptyArrayBitches.push(...getPostsByAuthor(db, author));
  }
  if (tags) {
    if (Array.isArray(tags)) {
      tags.forEach((tag) => {
        emptyArrayBitches.push(...getPostByTags(db, tag));
      });
    } else {
      emptyArrayBitches.push(...getPostByTags(db, tags));
    }
  }
  return emptyArrayBitches;
};

/**
 * This returns a slug based on the title
 * @param {string} title - Title of the post used to make the slug for the new post
 * @returns {string}
 */
export const getSlugForTitle = (title) => {
  return title.replaceAll(" ", "-").toLowerCase();
};

/**
 * Returns a post at a particular id from posts
 * @param {number} id - The id of the post we want to get
 * @param {DatabaseSync} db - The database we want to query
 * @returns {[Object]} Post object with id
 */
export const getPostAtId = (id, db) => {
  try {
    const post = db.prepare(`SELECT * FROM books WHERE id = ${id}`);
    return post.all();
  } catch (err) {
    console.log("=====================");
    console.log("getPostAtId");
    console.error(err);
    console.log("=====================");
  }
  return [];
};

/**
 * Returns the index of a particular id from posts
 * @param {string} id - The id of the post we want to get
 * @returns {number} index of post
 */
export const getIndexOfPostAtId = (id) => {
  return posts.findIndex((post) => String(post.id) === id);
};

/**
 * Returns a deleted post at a particular id from posts
 * @param {string} id - The id of the post we want to get
 * @returns {[Object] | null} Post object with id
 */
export const deletePostById = (id) => {
  const postIndex = getIndexOfPostAtId(id);
  if (postIndex < 0) {
    return null;
  }
  const deletedPost = posts.splice(postIndex, 1);
  return deletedPost;
};
