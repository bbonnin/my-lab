const config = require('./config')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const auth = require('./auth')
const trips = require('./trips')


// ---------------------
// Express configuration
// ---------------------
const app = express()
const router = express.Router()

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

app.use(cors())
app.use(cookieParser())
app.use(morgan('dev'))

const loginRequired = (req, res, next) => {
    if (req.user) {
        next()
    }
    else {
        return res.status(401).send({ message: 'Unauthorized user.'})
    }
}

app.use('/api/trips', (req, res, next) => {
    const token = (req.body && req.body.access_token) || req.query.access_token || req.cookies.access_token

    if (token) {
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                return res.status(400).send({ message: 'Failed to authenticate token.' })
            }

            req.user = decoded
            next()
        })
    }
    else {
        return res.status(403).send({ message: 'No token provided.' })
    }
})

// ------------------
// MongoDB connection
// ------------------
mongoose.Promise = Promise
mongoose.connect(config.mongo, { useNewUrlParser: true })
const mongo = mongoose.connection

mongo.on('error', () => {
    console.error('Cannot connect to the database')
})

mongo.once('open', () => {
    console.info('Connected to the database!')
})

// -----------------
// Route definitions
// -----------------
router.get('/', (req, res) => {
    res.send({ message: 'Welcome!' })
})

router.post('/auth/register', auth.register)
router.post('/auth/signin', auth.signin)

router.get('/trips', trips.list)

app.use('/api', router)

app.all('*', (req, res) => {
    res.status(404).send({ message: 'Hmmm... are you lost?' })
})


// ------------------
// - Start the server
// ------------------
const port = process.env.PORT || 3000;

const server = app.listen(port, function() {
    console.log('Server listening on port ' + port)
})
