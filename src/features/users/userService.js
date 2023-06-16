import axios from "axios"

// const URL = "http://localhost:5000"

const registerUser = async (formData) => {
  const response = await axios.post("http://localhost:5000/api/user/register",formData)

  if (response.data) {
    localStorage.setItem("User",JSON.stringify(response.data))
  }

  return response.data
}

const loginUser = async (formData) => {
  const response = await axios.post("http://localhost:5000/api/user/login",formData)

  if (response.data) {
    localStorage.setItem("User",JSON.stringify(response.data))
  }

  return response.data
}


const logout = async () => {
  localStorage.removeItem("User")
}
const userService = { registerUser,loginUser,logout }

export default userService
