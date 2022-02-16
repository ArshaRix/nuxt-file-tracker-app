const { Router } = require('express')
const router = Router()

const Document = require('../../models/Document')

router.get('/state/wa', async (req, res) => {
    try {
        Document
            .find({ document: 'Transcript of Records', action: 'Waiting for approval' })
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
            .find({ document: 'Transcript of Records', action: 'Waiting to release' })
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
            .find({ document: 'Transcript of Records', action: 'Ready to Pickup' })
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
            .find({ document: 'Transcript of Records', action: 'Remarks' })
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