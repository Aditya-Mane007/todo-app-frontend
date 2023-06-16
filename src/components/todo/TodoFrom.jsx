import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  createTodo,
  getAll,
  removeCurrentState,
  reset,
  updateTodo
} from "../../features/todos/todoSlice"

const TodoFrom = () => {
  const [todo, setTodo] = useState("")

  const dispatch = useDispatch()

  const { current, isSuccess } = useSelector((state) => state.todos)
  const onSubmit = (e) => {
    e.preventDefault()

    if (current === null) {
      const formData = {
        text: todo,
        isComplete: false
      }
      dispatch(createTodo(formData))
      setTodo("")
    } else {
      const formData = {
        id: current._id,
        text: todo
      }

      dispatch(updateTodo(formData))

      dispatch(removeCurrentState())
    }
  }

  useEffect(() => {
    if (current !== null) {
      setTodo(current.text)
    } else {
      setTodo("")
    }
  }, [current, isSuccess])

  return (
    <form onSubmit={onSubmit}>
      <div
        className="form-control"
        style={{ position: "sticky", width: "90%" }}
      >
        <label htmlFor="todo">Add Todo</label>
        <input
          type="text"
          name="todo"
          id="todo"
          placeholder="add new todo..."
          onChange={(e) => {
            setTodo(e.target.value)
          }}
          value={todo}
        />
      </div>
      <div className="form-control">
        <input
          type="submit"
          value={current ? "Update Todo" : "Add Tood"}
          className="btn"
          style={{ margin: ".5rem 0rem" }}
        />
        {current ? (
          <input
            type="submit"
            value="Clear"
            className="btn"
            onClick={() => {
              dispatch(removeCurrentState())
            }}
          />
        ) : (
          ""
        )}
      </div>
    </form>
  )
}

export default TodoFrom
