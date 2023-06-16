import React from "react"
import Todo from "./Todo"

const TodoItem = ({ todos }) => {
  return (
    <>
      {todos.map((todo) => (
        <Todo key={todo._id} todo={todo} />
      ))}
    </>
  )
}

export default TodoItem
