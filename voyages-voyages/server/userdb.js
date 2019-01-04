const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: { type: String, lowercase: true, required: true },
    email: { type: String, lowercase: true, required: true, unique: true },
    password: { type: String, required: true, bcrypt: true },
    isAdmin: Boolean
})

UserSchema.plugin(require('mongoose-bcrypt'))

const User = mongoose.model('user', UserSchema)

const register = userInfo => {
    const user = new User(userInfo)
    return user.save()
}

const signin = (email, password) => {
    return User.findOne({ email: email })
        .then(user => {
            if (user) {
                return user.verifyPassword(password)
                    .then(valid => {
                        return valid ? user : null
                    })
            }

            return null
        })
}

module.exports = { register, signin }