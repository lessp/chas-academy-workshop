import React from 'react'
import { render, fireEvent } from 'react-testing-library'

import TodoApp from '../TodoApp'

describe('TodoApp', () => {
  test('it renders', () => {
    const { getByText } = render(<TodoApp />)

    const title = getByText(/what do i need to do!/i)

    expect(title).toBeInTheDocument()
  })

  test('we can add a todo', () => {
    const { getByText, getByPlaceholderText } = render(<TodoApp />)
    const inputField = getByPlaceholderText('Add something to do...')
    fireEvent.click(inputField)
    fireEvent.change(inputField, {
      target: {
        value: 'Write more tests!',
      },
    })
    fireEvent.click(getByText(/add/i))

    expect(getByText(/write more tests!/i)).toBeInTheDocument()
  })

  test('we can mark a todo as complete', () => {
    const { getByText, getByPlaceholderText, getByAltText } = render(
      <TodoApp />
    )
    const inputField = getByPlaceholderText('Add something to do...')

    fireEvent.click(inputField)
    fireEvent.change(inputField, {
      target: {
        value: 'Write more tests!',
      },
    })
    fireEvent.click(getByText(/add/i))

    fireEvent.click(getByAltText('Complete'))

    expect(getByAltText('Incomplete')).toBeInTheDocument()
  })

  test('we can mark a todo as incomplete', () => {
    const { getByText, getByPlaceholderText, getByAltText } = render(
      <TodoApp />
    )
    const inputField = getByPlaceholderText('Add something to do...')

    fireEvent.click(inputField)
    fireEvent.change(inputField, {
      target: {
        value: 'Write more tests!',
      },
    })
    fireEvent.click(getByText(/add/i))

    fireEvent.click(getByAltText('Complete'))

    expect(getByAltText('Incomplete')).toBeInTheDocument()

    fireEvent.click(getByAltText('Incomplete'))

    expect(getByAltText('Complete')).toBeInTheDocument()
  })

  test('we can filter todos', () => {
    const {
      getByText,
      getByPlaceholderText,
      getByAltText,
      queryByText,
    } = render(<TodoApp />)
    const inputField = getByPlaceholderText('Add something to do...')
    fireEvent.click(inputField)
    fireEvent.change(inputField, {
      target: {
        value: 'Write more tests!',
      },
    })
    fireEvent.click(getByText(/add/i))

    fireEvent.click(getByAltText('Complete'))

    expect(getByAltText('Incomplete')).toBeInTheDocument()

    /* Click on the completed filter */
    fireEvent.click(getByText('Completed'))

    /* The todo should be here */
    expect(getByText('Write more tests!')).toBeInTheDocument()

    /* Click on the 'not completed' filter */
    fireEvent.click(getByText('Not completed'))

    /* The todo should not be here since it's completed */
    expect(queryByText('Write more tests!')).not.toBeInTheDocument()
  })
})
