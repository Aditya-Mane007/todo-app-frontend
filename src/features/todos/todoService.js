import axios from "axios"


const URL = "https://todo-app-backend-le2o.onrender.com"




const getAllTodos = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.get(URL + "/api/todos/getAll",config)

  return response.data.todo
}

const getActive = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.get(URL + "/api/todos/getActive",config)

  return response.data.todo
}

const getCompleted = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.get(URL + "/api/todos/getCompleted",config)

  return response.data.todo
}

const createTodo = async (token,formData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.post(URL + "/api/todos/create",formData,config)

  return response.data.todo
}

const updateTodo = async (token,formData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.put(URL + `/api/todos/update/${formData.id}`,formData,config)
  return response.data.todo
}

const deleteTodo = async (token,id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.delete(URL + `/api/todos/delete/${id}`,config)

  console.log(response.data)

  return response.data
}


const deleteAllTodo = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.delete(URL + `/api/todos/deleteAll`,config)


  return response.data
}

const setCurrent = async (text) => {
  return text
}

const removeCurrent = async () => {
  return null
}

const todoService = {
  getAllTodos,
  getActive,
  getCompleted,
  createTodo,
  updateTodo,
  deleteTodo,
  deleteAllTodo,
  setCurrent,
  removeCurrent
}

export default todoService
