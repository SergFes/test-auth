import HTML from './HTTP'

export default class AuthService {
    static auth({ name, email, password, isLogin }) {
        const authData = {
            email,
            password,
            name,
        }

        let url = '/registration'

        if (isLogin) {
            url = '/login'
            delete authData.name
        }

        return HTML.post(url, authData)
    }

    static setToken(token) {
        localStorage.setItem('token', token)
    }

    static deleteToken(token) {
        localStorage.removeItem(token)
    }
}
