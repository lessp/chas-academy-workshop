import React from 'react'
import { checkIcon, deleteIcon, todoEmpty } from './img/icons'

import Todo from '../Todo.module.css'

function TodoApp() {
  const [inputValue, setInputValue] = React.useState('')
  const [todos, setTodos] = React.useState([])
  const [activeFilter, setActiveFilter] = React.useState('All')

  const availableFilters = ['All', 'Completed', 'Not completed']

  const handleSubmit = event => {
    event.preventDefault()

    if (inputValue !== '') {
      setTodos([
        ...todos,
        {
          text: inputValue,
          done: false,
        },
      ])

      setInputValue('')
    }
  }

  const toggleTodo = todoToToggle => {
    setTodos(
      todos.map(t =>
        t.text === todoToToggle.text
          ? {
              ...t,
              done: !todoToToggle.done,
            }
          : t
      )
    )
  }

  const byActiveFilter = todo => {
    switch (activeFilter) {
      case 'All':
        return true
      case 'Completed':
        return todo.done
      case 'Not completed':
        return !todo.done
    }
  }

  return (
    <div className={Todo.wrapper}>
      <h1 className={Todo.title}>What do I need to do!</h1>

      {/* Input */}
      <form onSubmit={handleSubmit}>
        <input
          className={Todo.input}
          type="text"
          value={inputValue}
          placeholder="Add something to do..."
          onChange={e => setInputValue(e.target.value)}
        />
        <button className={Todo.primaryButton} type="submit">
          Add
        </button>
      </form>

      {/* Filters */}
      <ul className={Todo.filters}>
        {availableFilters.map(f => (
          <li
            key={f}
            className={f === activeFilter ? Todo.filterActive : Todo.filter}
            onClick={_event => setActiveFilter(f)}>
            {f}
          </li>
        ))}
      </ul>

      {/* List todos */}
      <ul className={Todo.list}>
        {todos.filter(byActiveFilter).map(t => (
          <li key={t.text} className={Todo.item}>
            <p className={Todo.todoItem}>{t.text}</p>
            <button className={Todo.icon} onClick={_event => toggleTodo(t)}>
              {t.done ? (
                <img alt="Incomplete" src={deleteIcon} />
              ) : (
                <img alt="Complete" src={checkIcon} />
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TodoApp
