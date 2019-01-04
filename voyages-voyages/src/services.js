import axios from 'axios'

const serverUrl = 'http://localhost:3000/api'

const login = (email, password) => {
    return axios.post(serverUrl + '/auth/signin', { email, password })
        .then(user => {
            localStorage.setItem('user', JSON.stringify(user))
        })
}

const logout = () => {
    localStorage.removeItem('user')
}

const csrfToken = () => {
    axios.get(serverUrl + '/auth/csrftoken')
        .then(response => {
            console.log('d=', response.data)
              axios.defaults.headers.common['X-CSRF-Token'] = response.data.csrfToken
        })
        .catch(err => {
            console.error(err)
        })
}


export default { login, logout, csrfToken }