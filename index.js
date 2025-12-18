import express from "express";
import posts from "./data.js";
import {
  getPostQuery,
  newPostExtraData,
  getPostAtId,
  getIndexOfPostAtId,
  deletePostById,
} from "./util.js";

import { db } from "./db-utils/sqlUtils.js";
import getAllPosts from "./db-utils/GET-functions/getAllPosts.js";

const app = express();
const PORT = 3000;

app.use(express.json());

// GET methods

// [x]
app.get("/api/posts/:id", (req, res) => {
  const postId = req.params.id;
  const postAtId = getPostAtId(postId, db);

  if (postAtId.length < 1) {
    return res.status(404).send({
      message: "Id not found",
    });
  }
  res.send(postAtId);
});

// [x]
app.get("/api/posts", (req, res) => {
  console.log(req.query);
  if (Object.keys(req.query).length > 0) {
    // One major bug
    // returning multiple books objects
    const newObject = getPostQuery(db, req.query);
    res.send(newObject);
  } else {
    const allPost = getAllPosts(db);
    if (allPost.length > 0) {
      res.send(allPost);
    } else {
      return res.status(404).send({
        message: "Resource does't exist yet",
      });
    }
  }
});

// POST methods

// TODO:
//[]
app.post("/api/posts", (req, res) => {
  const requiredKeys = ["title", "content", "author", "tags"];
  const isRequestValid = requiredKeys.every((key) =>
    req.body.hasOwnProperty(key),
  );

  if (!isRequestValid) {
    return res.status(400).send({
      message:
        "Request body is not valid, valid body contains: 'title', 'content', 'author', 'tags'",
    });
  }

  const { id, slug, created_at } = newPostExtraData(req.body.title);
  const newPost = { ...req.body, id, slug, created_at };
  posts.push(newPost); // instead of push, I want to adjust the file and put it put it there, would save that for when I connect to databases

  res.status(201).send({
    message: "Created new post",
    newPostCreated: newPost,
  });
});

// PUT method
app.put("/api/posts/:id", (req, res) => {
  const postId = req.params.id;
  const postIndex = getIndexOfPostAtId(postId);
  if (postIndex < 0) {
    return res.status(404).send({
      message: "Invalid post id",
    });
  }
  if (!req.body) {
    return res.status(404).send({
      message: "No body to update post",
    });
  }

  if (req.body?.title) {
    posts[postIndex].title = req.body.title;
    const updatedSlug = posts[postIndex].title
      .toLowerCase()
      .replaceAll(" ", "-");
    posts[postIndex].slug = updatedSlug;
  }
  if (req.body?.author) {
    posts[postIndex].author = req.body.author;
  }
  if (req.body?.tags) {
    posts[postIndex].tags = req.body.tags;
  }

  res.status(200).send({
    message: "Post has been updated",
    newPost: posts[postIndex],
  });
});

// DELETE
app.delete("/api/posts/:id", (req, res) => {
  const postId = req.params.id;
  const deletedPost = deletePostById(postId);
  if (!deletedPost) {
    return res.status(404).send({
      message: "PostId not found",
    });
  }

  console.log(deletedPost);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
