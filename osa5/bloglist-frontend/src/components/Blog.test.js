import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'testblog',
    author: 'tester',
    url: 'testurl'
  }

  render(<Blog blog={blog} />)

  const element1 = screen.getByText('testblog tester')
  const element2 = screen.queryByText('testurl')

  expect(element1).toBeDefined()
  expect(element2).toBeNull()
})

test('renders all content when view button pressed', async () => {
  const testuser = {
    name: 'testman',
    username: 't'
  }

  const blog = {
    title: 'testblog',
    author: 'tester',
    url: 'testurl',
    likes: 0,
    user: [testuser]
  }

  render(<Blog blog={blog} user={testuser} />)
  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const element1 = screen.getByText('testblog tester')
  const element2 = screen.getByText('0')
  const element3 = screen.getByText('testurl')
  const element4 = screen.getByText('testman')
  expect(element1).toBeDefined()
  expect(element2).toBeDefined()
  expect(element3).toBeDefined()
  expect(element4).toBeDefined()
})

test('test if like button works', async () => {
  const testuser = {
    name: 'testman',
    username: 't'
  }

  const blog = {
    title: 'testblog',
    author: 'tester',
    url: 'testurl',
    likes: 0,
    user: [testuser]
  }
  const mockHandler = jest.fn()

  render(<Blog blog={blog} user={testuser} updateBlogList={mockHandler} />)
  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)
  const likeButton = screen.getByText('like')

  expect(likeButton).toBeDefined()
})
