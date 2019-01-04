const mongoose = require('mongoose')

const TripSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }
})

const Trip = mongoose.model('trip', TripSchema)

const create = tripInfo => {
    const trip = new Trip(tripInfo)
    return trip.save()
}

const list = () => {
    return Trip.find()
}

module.exports = { create, list }