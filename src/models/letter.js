const mongoose = require('mongoose');

const letterSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    authorities:[{ 
        type: String, 
        required: true 
    }],
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected', 'In Progress', 'Completed'],
        default: 'Pending'
    },
    currentHolder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    qrCode: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    trackingLog: [
        {
            holder: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            timestamp: {
                type: Date,
                default: Date.now
            },
            status: {
                type: String,
                enum : ['Pending', 'Approved', 'Rejected', 'In Progress', 'Completed' ],
                default: 'Pending'
            }
        }
    ]
})

const Letter = mongoose.model('Letter', letterSchema);

module.exports = Letter;