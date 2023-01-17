import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = jest.fn()

  render(<BlogForm createBlog={createBlog} />)

  const input1 = screen.getByPlaceholderText('write title here')
  const input2 = screen.getByPlaceholderText('write author here')
  const input3 = screen.getByPlaceholderText('write url here')
  const sendButton = screen.getByText('create')
  screen.debug()
  await userEvent.type(input1, 'test title' )
  await userEvent.type(input2, 'test author' )
  await userEvent.type(input3, 'test url' )
  await userEvent.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('test title')
  expect(createBlog.mock.calls[0][0].author).toBe('test author')
  expect(createBlog.mock.calls[0][0].url).toBe('test url')
})