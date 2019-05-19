const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')

const authRoutes = require('./routes/auth')
const xkcdRoutes = require('./routes/xkcd')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(cors())

app.use('/', authRoutes)
app.use('/xkcd', xkcdRoutes)

app.listen(8888, () => {
    console.log('listening 8888 ...')
})
