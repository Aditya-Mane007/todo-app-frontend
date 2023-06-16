import React, { useEffect } from "react"
import TodoItem from "./todo/TodoItem"
import TodoFrom from "./todo/TodoFrom"
import { useDispatch, useSelector } from "react-redux"
import {
  deleteAllTodo,
  getAll,
  reset,
  getActive,
  getCompleted
} from "../features/todos/todoSlice"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import Spinner from "./Spinner"

const Home = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.users)
  const { todos, isError, isLoading, message } = useSelector(
    (state) => state.todos
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    dispatch(getAll())

    // return () => {
    //   dispatch(reset())
    // }
  }, [isError, message, dispatch, navigate])
  if (!user) {
    return (
      <>
        <div className="logo" style={{ color: "white", textAlign: "center" }}>
          <h3>Please login or register before start setting todos</h3>
        </div>
      </>
    )
  }
  return (
    <div className="home">
      <div className="todo-form">
        <TodoFrom />
      </div>
      <div className="todos-section">
        {/* {todos.length > 0 ? ( */}
        <div className="filter">
          <div className="nooftodos">{todos.length} left</div>
          <div className="filters">
            <li
              onClick={() => {
                dispatch(getAll())
              }}
            >
              All
            </li>
            <li
              onClick={() => {
                dispatch(getActive())
              }}
            >
              Active
            </li>
            <li
              onClick={() => {
                dispatch(getCompleted())
              }}
            >
              Completed
            </li>
          </div>
          <div
            className="clearAllbtn"
            onClick={() => {
              dispatch(deleteAllTodo())
            }}
          >
            Clear All
          </div>
        </div>

        {/* <div className="logo" style={{ color: "white" }}>
           You have not set any todos yet. //{" "} 
        </div> */}
        {isLoading ? (
          <>
            <Spinner />
          </>
        ) : (
          <>
            <TodoItem todos={todos} />
          </>
        )}
      </div>
    </div>
  )
}

export default Home
