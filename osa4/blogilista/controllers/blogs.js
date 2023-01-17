const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const middleware = require("../utils/middleware");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post(
  "/",
  [middleware.tokenExtractor, middleware.userExtractor],
  async (request, response) => {
    const body = request.body;
    if (!body.title || !body.url) {
      return response.status(400).json({
        error: "Title or URL missing",
      });
    }
    const user = await User.findById(request.user.id);

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user._id,
    });

    const result = await blog.save();
    user.blogs = user.blogs.concat(result._id);
    await user.save();
    response.status(201).json(result);
  }
);

blogsRouter.delete(
  "/:id",
  [middleware.tokenExtractor, middleware.userExtractor],
  async (request, response) => {
    const blogToDelete = await Blog.findById(request.params.id);
    if (!blogToDelete) {
      return response.status(204).end();
    }
    console.log(request);
    if (blogToDelete.user && blogToDelete.user.toString() !== request.user.id) {
      return response.status(401).json({
        error: "only the creator can delete a blog",
      });
    }

    await Blog.findByIdAndRemove(request.params.id);

    response.status(204).end();
  }
);

blogsRouter.put("/:id", async (request, response) => {
  const blog = request.body;
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
    runValidators: true,
    context: "query",
  });
  response.json(updatedBlog).end();
});

module.exports = blogsRouter;
