const mongoose = require('mongoose');

const letterSchema = new mongoose.Schema({
    sender: {
        name: {
         type: String,
         required: true
        },
       registrationNumber: {
         type: String,
         unique: true
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
            enum: ['Lecturer','Dean','Department Head','PostalDepartment','FacultyMA','DepartmentMA','WorkAid','Admin','Technical Officer', 'Demonstrator'] 
        },
        authorities:[{ 
            registrationNumber: {
                type: String
            },
            name: {
                type: String
            },
            role: {
                type: String,
                enum: ['Lecturer','Dean','Department Head','PostalDepartment','FacultyMA','DepartmentMA','WorkAid','Admin','Technical Officer', 'Demonstrator'] 
            },
        }],
        faculty: {
            type: String,
            required: true,
            enum: ['FOT','FMSC','FOE','FHSS','FAS','FAHS','FDS','FUAB','FOC','FMS','FGS']
        },
        department: {
            type: String,
            required: true,
            enum: ['ICT', 'BST', 'MMT', 'SFT', 'CET', 'Department1', 'Department2','Department3','Department4']
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
    required: function() {
        return this.isInternal;
    }
    },
    uniqueID: {
        type: String,
        unique: true,
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