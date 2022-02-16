const mongoose = require('mongoose')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        trim: true,
    },

    firstname: {
        type: String,
    },

    lastname: {
        type: String,
    },

    email: {
        type: String,
        unique: true,
        lowercase: true,
        validate(v) {
            if (!validator.isEmail(v)) {
                throw new Error('')
            }
        }
    },

    password: {
        type: String,
        minlength: 7,
        validate(v) {
            if (v.toLowerCase().includes('password')) {
                throw new Error('')
            }
        }
    },

    role: {
        type: String
    },

    registered: {
        type: String
    },

    // Student
    studentNumber: {
        type: String
    },

    course: {
        type: String
    },

    section: {
        type: String
    },

    yearGraduated: {
        type: Number
    },

    // Client
    department: {
        type: String
    },

    status: {
        type: String
    },

    position: {
        type: String
    },

    handlerFile: {
        type: String
    },

    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]

}, {
    timestamps: true
})

require('../config/schema')(userSchema)
const User = mongoose.model('User', userSchema)

module.exports = User