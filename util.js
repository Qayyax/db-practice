import posts from "./data.js";
import { DatabaseSync } from "node:sqlite";

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
  // using sql
  // Select from books where title == title
  // Select from books where author == author
  // Select from books where tags, would have to think about this one
  if (title) {
    // I would make a function that get's post by title
    // emptyArrayBitches.push(
    //   (post, ...args) => post.title.toLowerCase() === title.toLowerCase(),
    // );
    // const titlePosts = db.prepare(`SELECT * FROM books where title`)
  }
  if (author) {
    emptyArrayBitches.push(
      (post, ...args) => post.author.toLowerCase() === author.toLowerCase(),
    );
  }
  if (tags) {
    emptyArrayBitches.push((post, ...args) => {
      const queryTags = Array.isArray(tags) ? tags : [tags];
      return post.tags.some((tag) => queryTags.includes(tag));
    });
  }
  let $data = data;
  for (const fn of emptyArrayBitches) {
    $data = $data.filter(fn);
  }
  return $data;
};

/**
 * This returns an object for the new post
 * @param {string} title - Title of the post used to make the slug for the new post
 * @typedef {Object} PostData
 * @property {string} slug - slug based on title of post
 * @property {number} id - id of new post based on last id
 * @property {Date} created_at - time the new post was created
 * @returns {PostData}
 */
export const newPostExtraData = (title) => {
  const lastPostId = posts.at(-1).id + 1;
  const now = new Date();
  const createdDate = now.toISOString();

  return {
    id: lastPostId,
    slug: title.replaceAll(" ", "-").toLowerCase(),
    created_at: createdDate,
  };
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
