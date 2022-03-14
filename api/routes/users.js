const { Router } = require('express')
const router = Router()

const User = require('../models/User')
const auth = require('../config/auth')

const { sendWelcomeEmail } = require('../emails/account')

router.post('/', async (req, res) => {
    const user = new User(req.body)

    try {
        const token = await user.generateAuthToken()
        await user.save()
        sendWelcomeEmail(user.email, user.firstname)
        res.status(201).send({ token })
    } catch (err) {
        res.status(400).send()
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.username, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ token })
    } catch (err) {
        res.status(400).send()
    }
})

router.post('/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((userToken) => {
            return userToken.token !== req.token
        })

        await req.user.save()
        res.send('Successfully logged out')
    } catch (err) {
        res.status(500).send()
    }
})

router
    .route('/profile')
    .all(auth, (req, res, next) => {
        next()
    })
    .get((req, res) => {
        res.send(req.user)
    })
    .patch(async (req, res) => {
        const updates = Object.keys(req.body)
        const restrictUpdates = ['username', 'tokens']
        const restrictOperation = updates.every((restrict) => restrictUpdates.includes(restrict))

        if (restrictOperation) {
            return res.status(400).send({ error: 'Invalid updates!' })
        }

        try {
            updates.forEach((update) => req.user[update] = req.body[update])
            await req.user.save()
            res.send('User updated!')
        } catch (err) {
            res.status(400).send()
        }
    })
    .delete(async (req, res) => {
        try {
            await req.user.remove()
            res.send(` ${req.user._id} deleted!`)
        } catch (err) {
            res.status(500).send()
        }
    })

module.exports = router