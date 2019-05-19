import axios from 'axios'

export const URL = 'http://localhost:8888'

export default class HTTP {
    static get(path) {
        return axios.get(URL + path)
    }

    static post(path, body) {
        return axios.post(URL + path, body)
    }

    static delete(path, id) {
        return axios.delete(`${URL}${path}/${id}`)
    }

    static checkResponse({ data }) {
        if (typeof data !== 'object') {
            return false
        }
        return true
    }
}
