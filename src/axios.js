// axios
import axios from 'axios'

const baseURL = "http://127.0.0.1:8000/api"

export default axios.create({
  baseURL: baseURL
  // You can add your headers here
})
