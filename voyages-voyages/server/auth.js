const db = require('./userdb')
const jwt = require('jsonwebtoken')
const config = require('./config')

const register = (req, res) => {
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
        res.status(500).send('Problem when registering the user.') //TODO: 400 for client errors
    })
}

const signin = (req, res) => {
    db.signin(req.body.email, req.body.password)
    .then(user => {
        if (user) {
            const token = jwt.sign({ id: user.email }, config.secret, { expiresIn: 300 })
            res.cookie('access_token', token, { httpOnly: true, secure: true })
            res.status(200).send({ auth: true, name: user.name, email: user.email })
        }
        else {
            res.status(401).send({ message: 'Bad credentials.' })
        }
    })
    .catch(err => {
        console.error('Error: ' + err)
        res.status(500).send('Problem when signing in.') //TODO: 400 for client errors
    })
}

const getCsrfToken = (req, res) => {
    return res.json({ csrfToken: req.csrfToken() })
}

module.exports = { register, signin, getCsrfToken }