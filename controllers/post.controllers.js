const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// create a post
const createPost = async (req, res, next) => {
  try {
    const { slug, title, body, authorId } = req.body;
    const result = await prisma.post.create({
      data: {
        slug,
        title,
        body,
        author: { connect: { id: authorId } },
      },
    });
    res.json(result);
  } catch (error) {
    throw new Error(error);
  }
};

// Update Post
const updatePost = async (req, res, next) => {
  const { id } = req.params;
  const { title, body } = req.body;
  try {
    const result = await prisma.post.update({
      where: { id: id },
      data: {
        title: title,
        body: body,
      },
    });

    res.status(200).json({ updatedPost: result });
  } catch (error) {
    res.json({ error: `Post with ${id} does not exists` });
  }
};

// delete Post
const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await prisma.post.delete({
      where: { id: id },
    });
    res.status(200).json(deleted);
  } catch (error) {
    res.json({ error: `Post with ${id} does not exists` });
  }
};

// get post
const getPosts = async (req, res, next) => {
  try {
    const result = prisma.post.findMany();
    res.json(result);
  } catch (error) {
    res.json({ error: "No post was found" });
  }
};

module.exports = { createPost, deletePost, updatePost, getPosts };
