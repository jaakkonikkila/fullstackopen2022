const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
    response.json(blogs)
  })
  
blogsRouter.post('/', [middleware.tokenExtractor, middleware.userExtractor], async (request, response) => {
  const body = request.body
  if(!body.title || !body.url){
    return response.status(400).json({
      error: 'Title or URL missing'
    })
  }
  const user = await User.findById(request.user.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  const result = await blog.save()
  user.blogs = user.blogs.concat(result._id)
  await user.save()
  response.status(201).json(result)
})

blogsRouter.delete('/:id', [middleware.tokenExtractor, middleware.userExtractor], async (request, response) => {
  const user = await User.findById(request.user.id)
  const blog = await Blog.findById(request.params.id)

  if ( blog.user.toString() === user.id.toString() ) {
    await Blog.findByIdAndRemove(request.params.id)
    return response.status(204).end()
  }
  return response.status(401).json({error: 'only the same user that created the blog can delete it'})
})

blogsRouter.put('/:id', async (request, response) => {
  const newLikes = request.body
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newLikes, {new: true})
  response.json(updatedBlog).end()
})

module.exports = blogsRouter