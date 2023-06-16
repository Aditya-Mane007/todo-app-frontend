import axios from "axios"

const URL = "https://todo-app-backend-le2o.onrender.com"

const registerUser = async (formData) => {
  const response = await axios.post(URL + "/api/user/register",formData)

  if (response.data) {
    localStorage.setItem("User",JSON.stringify(response.data))
  }

  return response.data
}

const loginUser = async (formData) => {
  const response = await axios.post(URL + "/api/user/login",formData)

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
