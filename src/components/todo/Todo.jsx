import React from "react"
import Delete from "../../images/icon-cross.svg"
import { useDispatch } from "react-redux"
import {
  deleteTodo,
  setCurrentState,
  updateTodo
} from "../../features/todos/todoSlice"
import { BsPencilSquare } from "react-icons/bs"
import Right from "../../images/icon-check.svg"

const Todo = ({ todo }) => {
  const dispatch = useDispatch()

  console.log(todo.isComplete)
  const complete = () => {
    const formData = {
      id: todo._id,
      isComplete: !todo.isComplete
    }

    console.log(formData)
    dispatch(updateTodo(formData))
  }
  return (
    <div className={!todo.isComplete ? "todo" : "todo-complete"}>
      <div
        className={todo.isComplete ? "complete" : "isComplete"}
        onClick={complete}
      >
        <img src={Right} alt="" />
      </div>
      <div className={todo.isComplete ? "todo-text-complete" : "todo-text"}>
        {todo.text}
      </div>
      <div
        className="update"
        onClick={() => {
          dispatch(setCurrentState(todo))
        }}
      >
        <BsPencilSquare />
      </div>
      <div className="delete">
        <img
          src={Delete}
          alt="X"
          style={{ cursor: "pointer" }}
          onClick={() => {
            dispatch(deleteTodo(todo._id))
          }}
        />
      </div>
    </div>
  )
}

export default Todo
