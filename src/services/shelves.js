import axios from 'axios'
const baseUrl = '/api/shelves'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAllShelves = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const addShelf = async newObject => {
  const config = {
    headers: {
      Authorization: token
    }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const updateShelf = async (id, newObject) => {
  const config = {
    headers: {
      Authorization: token
    }
  }

  const response = await axios.put(`${baseUrl}/${id}`, newObject, config)
  return response.data
}

const deleteShelf = async id => {
  const config = {
    headers: {
      Authorization: token
    }
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { getAllShelves, addShelf, updateShelf, deleteShelf, setToken }