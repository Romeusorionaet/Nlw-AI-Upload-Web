import axios from 'axios'
const apiURL = import.meta.env.VITE_API_URL

export const api = axios.create({
  baseURL: apiURL,
})
