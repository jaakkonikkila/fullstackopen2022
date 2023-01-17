import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, updateBlogList, user, notify }) => {
  const [blogFullInfo, setBlogFullInfo] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const updateLikes = async () => {
    const newBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    }
    await blogService.update(newBlog, blog.id)
    updateBlogList()
  }

  const removeBlog = async () => {
    if (window.confirm('Remove blog' + blog.title + ' by ' + blog.author)) {
      await blogService.remove(blog.id)
      notify('blog removed successfully')
      updateBlogList()
    }
  }

  if (!blogFullInfo) {
    return (
      <div style={blogStyle} className='blog'>
        {blog.title} {blog.author}{' '}
        <button onClick={() => setBlogFullInfo(true)}>view</button>
      </div>
    )
  }

  if (user.name.toLowerCase() === blog.user[0].name.toLowerCase()) {
    return (
      <div style={blogStyle} className='blog'>
        <div>
          {blog.title} {blog.author}{' '}
          <button onClick={() => setBlogFullInfo(false)}>hide</button>
        </div>
        <div>{blog.url}</div>
        <div>
          {blog.likes} <button onClick={updateLikes}>like</button>
        </div>
        <div>{blog.user[0].name}</div>
        <button onClick={removeBlog}>remove</button>
      </div>
    )
  }

  return (
    <div style={blogStyle} className='blog' >
      <div>
        {blog.title} {blog.author}{' '}
        <button onClick={() => setBlogFullInfo(false)}>hide</button>
      </div>
      <div>{blog.url}</div>
      <div>
        {blog.likes} <button onClick={updateLikes}>like</button>
      </div>
      <div>{blog.user[0].name}</div>
    </div>
  )
}
export default Blog
