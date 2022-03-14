const mongoose = require('mongoose')
const Schema = mongoose.Schema

const documentSchema = new Schema({
    document: {
        type: String
    },

    action: {
        type: String
    },

    studentFirstName: {
        type: String
    },

    studentLastName: {
        type: String
    },

    studentEmail: {
        type: String
    },

    clientName: {
        type: String
    },

    description: {
        type: String
    },

    state: {
        type: String
    },

    remarks: {
        type: String
    },

    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

},{
    timestamps: true
})

const Document = mongoose.model('Document', documentSchema)

module.exports = Document