import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { registerUser, reset } from "../../features/users/userSlice"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.users
  )

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  })

  const { name, email, password, password2 } = formData

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const onSubmit = (e) => {
    e.preventDefault()

    if (password !== password2) {
      toast.error("Password do not match")
    }
    const formData = {
      name,
      email,
      password
    }

    console.log(formData)
    dispatch(registerUser(formData))
    setFormData({
      name: "",
      email: "",
      password: "",
      password2: ""
    })
  }

  useEffect(() => {
    if (isError) {
      console.log(message)
    }
    if (isSuccess || user) {
      toast.success("Register Successful")
      navigate("/")
    }
    return () => {
      dispatch(reset())
    }
  }, [user, isError, isSuccess, message, navigate, dispatch])
  return (
    <div className="register">
      <h1>Register User</h1>
      <div>
        <form onSubmit={onSubmit}>
          <div className="form-control">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              onChange={onChange}
              value={name}
            />
          </div>
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
            <label htmlFor="password2">Confirm Password</label>
            <input
              type="password"
              name="password2"
              id="password2"
              placeholder="Confirm Password"
              onChange={onChange}
              value={password2}
            />
          </div>
          <div className="form-control">
            <input type="submit" value="Register" className="btn" />
          </div>
          <div className="form-control">
            <h3>
              Alerdy have account ? <Link to="/login">Login</Link>
            </h3>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
