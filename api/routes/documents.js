const { Router } = require('express')
const router = Router()

const Document = require('../models/Document')
const auth = require('../config/auth')

const { sendFileRequest } = require('../emails/account')

router.post('/', auth, async (req, res) => {

    const documentReq = new Document({
        ...req.body,
        creator: req.user._id
    })
    
    try {
        await documentReq.save()
        sendFileRequest(documentReq.stundentEmail, documentReq.document, documentReq.action)
        res.status(201).send({})
    } catch (err) {
        res.status(400).send()
    }
})

router.get('/', async (req, res) => {
    try {
        Document
            .find({})
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

router.get('/list', auth, async (req, res) => {

    try {
        Document
            .find({ creator: req.user })
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

router.get('/list/count', auth, async (req, res) => {
    let count = await Document.countDocuments({ creator: req.user })

    res.json(count)
})

router
    .route('/:id')
    .all(auth, (req, res, next) => {
        next()
    })
    .get((req, res) => {
        const _id = req.params.id
    
        Document.findOne({ _id }, (err, document) => {
            if (err) {
                return res.status(500).json({
                    message: 'Error'
                })
            }
    
            if (!document) {
                return res.status(404).json({
                    message: 'No such record'
                })
            }
            return res.send(document)
        }).populate('creator')
    })
    .patch(async (req, res) => {
        const _id = req.params.id
        const body = req.body

        const updates = Object.keys(body)
        const allowedUpdate = ['action', 'clientName', 'state', 'remarks']

        const isValidOperation = updates.every((value) => allowedUpdate.includes(value))
        
        if (!isValidOperation) {
            return res.status(400).send({
                message: `Cannot update Document with id=${_id}. Invalid input..`
            })
        }

        try {
            const documentReq = await Document.findOne({ _id })
    
            if (!documentReq) {
                return res.status(404).send('Document not found!')
            }
    
            updates.forEach((update) => documentReq[update] = body[update])
            await documentReq.save()
            sendFileRequest(documentReq.stundentEmail, documentReq.document, documentReq.action)
            res.send(documentReq)
    
        } catch (err) {
            res.status(500).send()
        }        
        
    })
    .delete(async (req, res) => {
        const _id = req.params.id

        try {
            const document = await Document.findOneAndDelete({_id, creator: req.user._id})
            
            if (!document) {
                return res.status(404).send()
            }
    
            res.send('Document deleted!')
    
        } catch (e) {
            res.status(500).send()
        } 
    })


module.exports = router