import React, { useEffect } from "react"
import { FaRegUser } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import Moon from "../../images/icon-moon.svg"
import Sun from "../../images/icon-sun.svg"
import { changeMode, logout, reset } from "../../features/users/userSlice"
import { toast } from "react-toastify"

const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isNight, user, isError, message } = useSelector(
    (state) => state.users
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
  }, [isError, message, dispatch, user, navigate])

  const onLogout = () => {
    dispatch(logout())
    // dispatch(reset())
    navigate("/login")
  }
  return (
    <div className="navbar">
      <div className="logo">
        <Link to="/">TODO</Link>
      </div>

      <div className="nav-links">
        <div
          className="nav-link mode"
          onClick={() => {
            dispatch(changeMode())
            let body = document.querySelector("#root")
            if (isNight) {
              body.className = "dark-mode"
            } else {
              body.className = "light-mode"
            }
          }}
        >
          {isNight ? <img src={Sun} alt="" /> : <img src={Moon} alt="" />}
        </div>
        <div className="nav-link auth">
          <div className="logo">
            <FaRegUser />
          </div>
          <div className="text">
            {!user ? (
              <>
                <Link to="/register" style={{ cursor: "pointer" }}>
                  register/login
                </Link>
              </>
            ) : (
              <h3>{user && user.name}</h3>
            )}
          </div>
        </div>
        {user ? (
          <>
            <div className="nav-link btn" onClick={onLogout}>
              logout
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  )
}

export default Navbar
