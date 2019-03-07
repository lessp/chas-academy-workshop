import React from 'react'
import { checkIcon, deleteIcon, todoEmpty } from './img/icons'

import Todo from '../Todo.module.css'

function TodoApp() {
  return (
    <div className={Todo.wrapper}>
      <h1 className={Todo.title}>Testing, testing...</h1>
    </div>
  )
}

export default TodoApp
