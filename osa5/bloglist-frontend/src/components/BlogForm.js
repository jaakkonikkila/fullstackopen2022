import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input value={newTitle} onChange={handleTitleChange} placeholder='write title here' id='title-input' />
        </div>
        <div>
          author:
          <input value={newAuthor} onChange={handleAuthorChange} placeholder='write author here' id='author-input' />
        </div>
        <div>
          url:
          <input value={newUrl} onChange={handleUrlChange} placeholder='write url here' id='url-input' />
        </div>
        <div>
          <button type="submit" id='create-button'>create</button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm
