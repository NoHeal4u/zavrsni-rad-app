import axios from 'axios'

export default class Galleries {
  constructor () {
    axios.defaults.baseURL = 'http://localhost:8000/api/'
  }

  getAll () {
    return axios.get('galleries')
  }

  add (gallery) {
    return axios.post('galleries', gallery)
  }

  remove (id) {
    return axios.delete(`galleries/${id}`)
  }

  edit (gallery) {
    return axios.put(`galleries/${gallery.id}`, gallery)
  }

  get (id) {
    return axios.get(`galleries/${id}`)
  }
}

export const galleries = new Galleries()
