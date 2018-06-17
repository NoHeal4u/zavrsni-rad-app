import axios from 'axios'

export default class Comment {
  constructor () {
    axios.defaults.baseURL = 'http://localhost:8000/api/'
  }

  add (comment) {
    return axios.post('comments', comment)
  }

  remove (id) {
    return axios.delete(`comments/${id}`)
  }

  
}

export const comments = new Comment()
