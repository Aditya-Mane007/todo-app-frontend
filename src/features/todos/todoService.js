import axios from "axios"


// const URL = "http://localhost:5000/api/todos"


const getAllTodos = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.get("http://localhost:5000/api/todos/getAll",config)

  return response.data.todo
}

const getActive = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.get("http://localhost:5000/api/todos/getActive",config)

  return response.data.todo
}

const getCompleted = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.get("http://localhost:5000/api/todos/getCompleted",config)

  return response.data.todo
}

const createTodo = async (token,formData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.post("http://localhost:5000/api/todos/create",formData,config)

  return response.data.todo
}

const updateTodo = async (token,formData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.put(`http://localhost:5000/api/todos/update/${formData.id}`,formData,config)
  return response.data.todo
}

const deleteTodo = async (token,id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.delete(`http://localhost:5000/api/todos/delete/${id}`,config)

  console.log(response.data)

  return response.data
}


const deleteAllTodo = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.delete(`http://localhost:5000/api/todos/deleteAll`,config)


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
