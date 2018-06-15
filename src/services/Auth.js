import axios from 'axios'

export default class AuthService {
  login(email, password) {
    return axios.post('http://localhost:8000/api/login', {
      email, password
    }).then(data => {
      window.localStorage.setItem('loginToken', data.data.token)
      window.localStorage.setItem('userId', data.data.user.id )
      this.setAxiosDefaultAuthorizationHeader()
      
      // console.log(data.data.user)
      // console.log(localStorage.getItem('userId'))

    })
  }

  setAxiosDefaultAuthorizationHeader() {
    const TOKEN = window.localStorage.getItem('loginToken')
    axios.defaults.headers.common['Authorization'] = `Bearer ${TOKEN}`
  }

  logout() {
    window.localStorage.removeItem('loginToken')
    window.localStorage.removeItem('userId')
    delete axios.defaults.headers.common['Authorization']
  }

  isAuthenticated() {
    return !!window.localStorage.getItem('loginToken')
  }
}

export const authService = new AuthService()

