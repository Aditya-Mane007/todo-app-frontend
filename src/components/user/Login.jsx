import React, { useEffect, useState } from "react"
import { loginUser, reset } from "../../features/users/userSlice"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user, isSuccess, message, isError } = useSelector(
    (state) => state.users
  )

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const { email, password } = formData

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const onSubmit = (e) => {
    e.preventDefault()

    const formData = {
      email,
      password
    }
    dispatch(loginUser(formData))

    setFormData({
      email: "",
      password: ""
    })
  }

  useEffect(() => {
    if (isError) {
      console.log(message)
    }
    if (user) {
      navigate("/")
    }
    return () => {
      dispatch(reset())
    }
  }, [user, message, isSuccess, isError, dispatch, navigate])
  return (
    <div className="register">
      <h1>Login User</h1>
      <div>
        <form onSubmit={onSubmit}>
          <div className="form-control">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              onChange={onChange}
              value={email}
            />
          </div>
          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              onChange={onChange}
              value={password}
            />
          </div>
          <div className="form-control">
            <input type="submit" value="Login" className="btn" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
