import axios from 'axios'
const baseUrl = '/api/books'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAllBooks = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const addBook = async newObject => {
  const config = {
    headers: {
      Authorization: token
    }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const updateBook = async (id, newObject) => {
  const config = {
    headers: {
      Authorization: token
    }
  }

  const response = await axios.put(`${baseUrl}/${id}`, newObject, config)
  return response.data
}

const deleteBook = async id => {
  const config = {
    headers: {
      Authorization: token
    }
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { getAllBooks, addBook, updateBook, deleteBook, setToken }