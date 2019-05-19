const errorHandler = require('../utils/errorHandler')
const axios = require('axios')

module.exports = {
    getData: async (req, res) => {
        try {
            const result = await axios.get(
                `https://xkcd.com/${Math.floor(
                    Math.random() * 1000
                )}/info.0.json`
            )
            res.send(JSON.stringify(result.data))
        } catch (e) {
            console.log(e)
            errorHandler(res, e)
        }
    },
}
