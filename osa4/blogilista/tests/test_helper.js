const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: "Paras Blogi",
        author: "Ei voi kertoa",
        url: "HTTPS:://JEEEJEE.com",
        likes: 132,
        user: [{username: "Jake",
            name: "Jaakko Nikkilä",
            _id: "6374b90005e58c6515f95552"}]
    },
    {
        title: "Paskin Blogi",
        author: "Minä",
        url: "HTTPS:://byaabyaa.com",
        likes: 2,
        user: [{username: "Jake",
            name: "Jaakko Nikkilä",
            _id: "6374b90005e58c6515f95552"}]
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
  }

module.exports = {
    initialBlogs, blogsInDb, usersInDb
}