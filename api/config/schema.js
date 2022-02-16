"use strict"

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = function (userSchema) {

    userSchema.pre('save', async function (next) {
        const user = this
    
        if (user.isModified('password')) {
            user.password = await bcrypt.hash(user.password, 8)
        }
    
        next()
    })

    userSchema.methods.generateAuthToken = async function () {
        const user = this
        const token = jwt.sign({ _id: user._id.toString()}, process.env.JWT_SECRET)
    
        user.tokens = user.tokens.concat({ token })
        await user.save()
    
        return token
    }
    
    userSchema.statics.findByCredentials = async function (username, password) {
        const user = await this.findOne({ username })
    
        if (!user) {
            throw new Error('Unable to login')
        }
    
        const isMatch = await bcrypt.compare(password, user.password)
    
        if (!isMatch) {
            throw new Error('Unable to login')
        }
    
        return user
    }
    
    userSchema.methods.toJSON = function () {
        const user = this
        const userObject = user.toObject()
    
        delete userObject.password
        delete userObject.tokens
        delete userObject.__v
    
        return userObject
    }

    userSchema.virtual('documents', {
        ref: 'Documents',
        localField: '_id',
        foreignField: 'creator',
    })

    userSchema.virtual('request', {
        ref: 'Documents',
        localField: '_id',
        foreignField: 'creator',
    })

}