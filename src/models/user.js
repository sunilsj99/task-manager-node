const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const user_schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        validate(v) {
            if (!validator.isEmail(v)) {
                throw new Error('Email is not valid !!')
            }
        }
    },
    password: {
        type: String,
        trim: true,
        required: true,
        validate(v) {
            if (!(v.length > 6 && v !== 'password')) {
                throw new Error('password is not upto the standards')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    }
}, {
    timestamps: true
})

user_schema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'createdBy'
})

//For whole User we use statics and for individual user we use methods

user_schema.methods.toJSON = function () {
    const user = this
    const returnUser = user.toObject()

    delete returnUser.password
    delete returnUser.tokens
    delete returnUser.avatar

    return returnUser
}

user_schema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({
        _id: user._id.toString()
    }, process.env.JWT_SECRET)

    user.tokens = user.tokens.concat({
        token
    })
    await user.save()

    return token
}

user_schema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({
        email
    })
    if (!user) {
        throw new Error('Unable to Login')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Unable to Login')
    }
    return user
}

user_schema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

//delete user tasks when user is deleted

user_schema.pre('remove', async function (next) {
    const user = this
    await Task.deleteMany({
        createdBy: user._id
    })
    next()
})

const User = mongoose.model('User', user_schema)

module.exports = User