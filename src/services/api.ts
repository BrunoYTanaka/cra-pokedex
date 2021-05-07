import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.beta.mejorconsalud.com/wp-json/mc',
})

export default api
