const db = require('./tripdb')

const list = (req, res) => {
    db.list()
    .then(trips => {
        res.send(trips)
    })
    .catch(err => {
        console.error('Error: ' + err)
        res.status(500).send('Problem when listing the trips.')
    })
}

const create = (req, res) => {
    db.create({
        name: req.body.name
    })
    .then(trip => {
        res.status(200).send({ name: trip.name })
    })
    .catch(err => {
        console.error('Error: ' + err)
        res.status(500).send('Problem when creating the trip.') //TODO: 400 for client errors
    })
}

module.exports = { list, create }