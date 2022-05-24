import axios from 'axios'
const baseUrl = '/api/users'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const addUser = async (newObject) => {
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

const updateUser = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}


export default { getAll, addUser, updateUser }
