const { Router } = require('express')
const router = Router()

const Document = require('../../models/Document')

router.get('/state/wa', async (req, res) => {
    try {
        Document
            .find({ document: 'Good Moral Certificate', action: 'Waiting for approval' })
            .populate('creator')
            .exec((err, data) => {
            if (err) console.log(err)
            else res.send(data)
        })
    } catch (err) {
        res.status(500).send(err)
        console.log(err)
    }
})

router.get('/state/wr', async (req, res) => {
    try {
        Document
            .find({ document: 'Good Moral Certificate', action: 'Waiting to release' })
            .populate('creator')
            .exec((err, data) => {
            if (err) console.log(err)
            else res.send(data)
        })
    } catch (err) {
        res.status(500).send(err)
        console.log(err)
    }
})

router.get('/state/rp', async (req, res) => {
    try {
        Document
            .find({ document: 'Good Moral Certificate', action: 'Ready to Pickup' })
            .populate('creator')
            .exec((err, data) => {
            if (err) console.log(err)
            else res.send(data)
        })
    } catch (err) {
        res.status(500).send(err)
        console.log(err)
    }
})

router.get('/state/rm', async (req, res) => {
    try {
        Document
            .find({ document: 'Good Moral Certificate', action: 'Remarks' })
            .populate('creator')
            .exec((err, data) => {
            if (err) console.log(err)
            else res.send(data)
        })
    } catch (err) {
        res.status(500).send(err)
        console.log(err)
    }
})


module.exports = router