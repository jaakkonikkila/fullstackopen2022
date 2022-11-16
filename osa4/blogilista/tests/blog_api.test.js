const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all Blogs are returned', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('returned blogs have id', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].id).toBeDefined()

})

test('a valid blog can be added ', async () => {
  const newBlog = {
      title: "Test Blog",
      author: "Tester",
      url: "HTTPS:://test.com",
      likes: 132
  }
  const user = {
    username: "Jake",
    name: "Jaakko Nikkilä",
    password: "salasana",
    blogs: []
  }

  
  await api.post('/api/users').send(user)

  const loggeduser = await api.post('/api/login').send({username: "Jake", password: "salasana"})
  const token = loggeduser.body.token

  await api
    .post('/api/blogs')
    .set('Authorization', "bearer " + token)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(n => n.title)
  expect(titles).toContain(
    'Test Blog'
  )
})

test('a valid blog without likes can be added ', async () => {
  const newBlog = {
      title: "Test Blog",
      author: "Tester",
      url: "HTTPS:://test.com",
  }
  const user = {
    username: "Jake",
    name: "Jaakko Nikkilä",
    password: "salasana",
    blogs: []
  }

  
  await api.post('/api/users').send(user)

  const loggeduser = await api.post('/api/login').send({username: "Jake", password: "salasana"})
  const token = loggeduser.body.token

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', "bearer " + token)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(n => n.title)
  expect(titles).toContain(
    'Test Blog'
  )
})

test('trying to add an invalid blog', async () => {
  const newBlog = {
      author: "Tester",
      likes: 5000
  }
  const user = {
    username: "Jake",
    name: "Jaakko Nikkilä",
    password: "salasana",
    blogs: []
  }

  
  await api.post('/api/users').send(user)

  const loggeduser = await api.post('/api/login').send({username: "Jake", password: "salasana"})
  const token = loggeduser.body.token


  await api
    .post('/api/blogs')
    .set('Authorization', "bearer " + token)
    .send(newBlog)
    .expect(400)

})

test('a blog can be deleted', async () => {
  const newBlog = {
    title: "Test Blog",
    author: "Tester",
    url: "HTTPS:://test.com",
    likes: 132
  }


  const user = {
    username: "Jake",
    name: "Jaakko Nikkilä",
    password: "salasana",
    blogs: []
  }

  await api.post('/api/users').send(user)

  const loggeduser = await api.post('/api/login').send({username: "Jake", password: "salasana"})
  const token = loggeduser.body.token

  const blogToDelete = await api
    .post('/api/blogs')
    .set('Authorization', "bearer " + token)
    .send(newBlog)

  await api
    .delete(`/api/blogs/${blogToDelete.body.id}`)
    .set('Authorization', "bearer " + token)
    .expect(204)

})

test('returns status code 401 if no token provided', async () => {
  const newBlog = {
    title: "Test Blog",
    author: "Tester",
    url: "HTTPS:://test.com",
    likes: 132
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)

})

test('a blogs likes can be updated', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]
  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send({likes: 69})
  
  const blogsAtEnd = await helper.blogsInDb()
  const likes = blogsAtEnd.map(r => r.likes)
  expect(likes).toContain(69)
})

afterAll(() => {
  mongoose.connection.close()
})