const config = require('./config')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const db = require('./db')


// ---------------------
// Express configuration
// ---------------------
const app = express()
const router = express.Router()

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

app.use(cors())

app.use(morgan('dev'))

const loginRequired = (req, res, next) => {
    if (req.user) {
        next()
    }
    else {
        return res.status(401).send({ message: "Unauthorized user."})
    }
}

app.use('/api/trips', (req, res, next) => {
    console.log(req.headers)
    const token = (req.body && req.body.token) || req.query.token || req.headers['x-access-token']

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

// - Auth routes
// -------------
router.post('/auth/register', (req, res) => {
    db.register({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        isAdmin: false
    })
    .then(user => {
        res.status(200).send({ name: user.name, email: user.email })
    })
    .catch(err => {
        console.error('Error: ' + err)
        res.status(500).send("Problem when registering the user.") //TODO: 400 for client errors
    })
})

router.post('/auth/signin', (req, res) => {
    db.signin(req.body.email, req.body.password)
    .then(user => {
        if (user) {
            const token = jwt.sign({ id: user.email }, config.secret, { expiresIn: 300 })
            res.status(200).send({ auth: true, token: token, name: user.name, email: user.email })
        }
        else {
            res.status(401).send({ message: "Bad credentials." })
        }
    })
    .catch(err => {
        console.error('Error: ' + err)
        res.status(500).send("Problem when signing in.") //TODO: 400 for client errors
    })
})

// - Trips routes
// --------------
router.get('/trips', (req, res) => {
    res.send([])
})


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
