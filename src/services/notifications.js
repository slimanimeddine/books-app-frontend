import axios from 'axios'
const baseUrl = '/api/notifications'

const getAllNotifications = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const addNotification = async newObject => {
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

export default { getAllNotifications, addNotification }