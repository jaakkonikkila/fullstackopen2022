const dummy = (blogs) => {
    return 1;
  }
  
const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((max, blog) => max.likes > blog.likes ? max : blog, {id: "",
    title: "",
    author: "",
    url: "",
    likes: 0})
}

const mostBlogs = (blogs) => {
    const newArray = blogs.map(blog => {
        const arrayWithAuthorBlogs = blogs.filter(x => x.author === blog.author)
        return {author: blog.author, blogs: arrayWithAuthorBlogs.length}
    })

    return newArray.reduce((max, blog) => max.blogs > blog.blogs ? max : blog, {author: "",
    blogs: 0})
}

const mostLikes = (blogs) => {
    const newArray = blogs.map(blog => {
        const arrayWithAuthorBlogs = blogs.filter(x => x.author === blog.author)
        const totalLikes = arrayWithAuthorBlogs.reduce((sum, blog) => sum + blog.likes, 0)
        return {author: blog.author, likes: totalLikes}
    })

    return newArray.reduce((max, blog) => max.likes > blog.likes ? max : blog, {author: "",
    likes: 0})
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
    }