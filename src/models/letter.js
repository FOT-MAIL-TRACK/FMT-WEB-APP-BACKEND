const mongoose = require('mongoose');

const letterSchema = new mongoose.Schema({
    sender: {
       registrationNumber: {
        type: String,
        unique: true,
        required: true
       },
       address: {
        type: String,
        required: true
       }
    },
    receiver: {
        name: {
         type: String,
         required : true
        },
        registrationNumber: {
            type: String,
            required: true
        },
        receiverRole: {
            type: String,
            required: "true",
            enum: ['Lecturer','Dean','Department Head','PostalDepartmentMA','FacultyMA','DepartmentMA','Admin','Technical Officer', 'Demonstrator'] 
        },
        authorities:[{ 
            registrationNumber: {
                type: String,
                required: true
            },
            role: {
                type: String,
                required: "true",
                enum: ['Lecturer','Dean','Department Head','PostalDepartmentMA','FacultyMA','DepartmentMA','Admin','Technical Officer', 'Demonstrator'] 
            },
        }],
        faculty: {
            type: String,
            required: true
        },
        department : {
            type : String,
            required : true
        }
    },
    
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
                ref: 'User',
                required: true
            },
            date: {
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
}, {
    timestamps: true,
})

const Letter = mongoose.model('Letter', letterSchema);

module.exports = Letter;