const errorHandler = require('../utils/errorHandler')
const fs = require('fs')
const path = require('path')

module.exports = {
    regUser: async (req, res) => {
        try {
            const { name, email, password } = req.body
            fs.readFile(path.resolve('./files/users.json'), 'utf8', function(
                error,
                data
            ) {
                if (error) throw error
                const users = JSON.parse(data)
                if (users.some(user => user.email === email)) {
                    return res.status(401).json({ msg: 'email занят' })
                }
                users.push({ name, email, password })
                const newUsers = JSON.stringify(users, '', 4)
                fs.writeFile(
                    path.resolve('./files/users.json'),
                    newUsers,
                    function(error) {
                        if (error) throw error
                        res.status(200).json({
                            token: `token:${Math.random()}`,
                        })
                    }
                )
            })
        } catch (e) {
            console.log(e)
            errorHandler(res, e)
        }
    },
    logUser: async (req, res) => {
        try {
            const { name, email, password } = req.body
            fs.readFile(path.resolve('./files/users.json'), 'utf8', function(
                error,
                data
            ) {
                if (error) throw error
                const users = JSON.parse(data)
                const user = users.find(user => user.email === email)
                if (user) {
                    if (user.password === password) {
                        return res
                            .status(200)
                            .json({ token: `token:${Math.random()}` })
                    }
                }
                res.status(401).json({ msg: 'Неверный email или пароль' })
            })
        } catch (e) {
            errorHandler(res, e)
        }
    },
}
