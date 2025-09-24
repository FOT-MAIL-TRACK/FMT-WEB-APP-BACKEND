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
       },
               faculty: {
            type: String,
            enum: [
                'Administration',
                'FOT',
                'FMSC',
                'FMS',
                'FAS',
                'FHSS',
                'FAHS',
                'FGS',
                'FOE',
                'Dental',
                'FUAB',
                'FOC',
                'Postal Department'
            ],
            required: true
        },
        department: {
            type: String,
            enum: [
                // Administration
                'Registrar / VC', 'Academic Establishment', 'Non Academic Establishment', 'Finance',
                'ASAP / Exam', 'General Admin', 'Legal', 'Capital Works', 'EIS', 'Supply & Stores',
                'AHEAD', 'Int. Audit', 'Gvt. Audit', 'Proctors', 'Staff Development',
                'Student Welfare', 'Library', 'LIBD', 'IT Centre', 'Career Guidance',

                // FOT - Technology Faculty
                'Technology Faculty',

                // FMSC
                'Deans Office', 'Accounting', 'Decision Science', 'Finance', 'Commerce',
                'Marketing Management', 'Business Administration', 'Business Economics',
                'Estate Management', 'ITRC / Business Com / Legal Studies', 'Public Administration',
                'HRM', 'Entrepreneurship', 'ICT - MGT', 'Business Linkage', 'MBA / MSC',

                // FMS
                'Deans Office', 'Pharmacology', 'Paediatrics', 'Family Medicine', 'Pathology', 'Micro Biology',
                'Parasitology', 'Medicine', 'Bio Chemistry', 'Community Medicine',
                'OB & GYN', 'Physiology', 'Immunology & Molecular Medicine',
                'Psychology', 'Surgery', 'Medical Education', 'Anatomy',
                'Nursing', 'Forensic Medicine',

                // FAS
                'Deans Office', 'Botany', 'Sports Science', 'Food', 'Statistics / Computer Science', 'Physics',
                'Forestry', 'Mathematics', 'Physical Education', 'Zoology', 'Chemistry',
                'Instrument / Polymer', 'Molecular Biology',

                // FHSS
                'Deans Office', 'Sinhala', 'Geography', 'Social Statistics', 'ICT', 'Pali Buddhist',
                'Languages & Culture', 'Economics', 'Political Science', 'Philosophy / Psychology',
                'History & Archaeology', 'Sociology & Anthropology', 'DELT', 'English',
                'Criminology', 'Music', 'Art IT',

                // FAHS
                'Allied Health Sciences',

                // FGS
                'PhD',

                // FOE
                'Engineering Faculty',

                // Dental
                'Dental Faculty',

                // FUAB
                'Urban & Aquatic Faculty',

                //FOC
                'Computing Faculty',

                //Postal Department
                'Postal Department'
            ]
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
            enum: ['Dean','Department Head','Lecturer','PostalDepartmentMA','FacultyMA','DepartmentMA','WorkAid','Super Admin','Technical Officer', 'Demonstrator'] 
        },
        faculty: {
            type: String,
            enum: [
                'Administration',
                'FOT',
                'FMSC',
                'FMS',
                'FAS',
                'FHSS',
                'FAHS',
                'FGS',
                'FOE',
                'Dental',
                'FUAB',
                'FOC',
                'Postal Department'
            ],
            required: true
        },
        department: {
            type: String,
            enum: [
                // Administration
                'Registrar / VC', 'Academic Establishment', 'Non Academic Establishment', 'Finance',
                'ASAP / Exam', 'General Admin', 'Legal', 'Capital Works', 'EIS', 'Supply & Stores',
                'AHEAD', 'Int. Audit', 'Gvt. Audit', 'Proctors', 'Staff Development',
                'Student Welfare', 'Library', 'LIBD', 'IT Centre', 'Career Guidance',

                // FOT - Technology Faculty
                'Technology Faculty',

                // FMSC
                'Deans Office', 'Accounting', 'Decision Science', 'Finance', 'Commerce',
                'Marketing Management', 'Business Administration', 'Business Economics',
                'Estate Management', 'ITRC / Business Com / Legal Studies', 'Public Administration',
                'HRM', 'Entrepreneurship', 'ICT - MGT', 'Business Linkage', 'MBA / MSC',

                // FMS
                'Deans Office', 'Pharmacology', 'Paediatrics', 'Family Medicine', 'Pathology', 'Micro Biology',
                'Parasitology', 'Medicine', 'Bio Chemistry', 'Community Medicine',
                'OB & GYN', 'Physiology', 'Immunology & Molecular Medicine',
                'Psychology', 'Surgery', 'Medical Education', 'Anatomy',
                'Nursing', 'Forensic Medicine',

                // FAS
                'Deans Office', 'Botany', 'Sports Science', 'Food', 'Statistics / Computer Science', 'Physics',
                'Forestry', 'Mathematics', 'Physical Education', 'Zoology', 'Chemistry',
                'Instrument / Polymer', 'Molecular Biology',

                // FHSS
                'Deans Office', 'Sinhala', 'Geography', 'Social Statistics', 'ICT', 'Pali Buddhist',
                'Languages & Culture', 'Economics', 'Political Science', 'Philosophy / Psychology',
                'History & Archaeology', 'Sociology & Anthropology', 'DELT', 'English',
                'Criminology', 'Music', 'Art IT',

                // FAHS
                'Allied Health Sciences',

                // FGS
                'PhD',

                // FOE
                'Engineering Faculty',

                // Dental
                'Dental Faculty',

                // FUAB
                'Urban & Aquatic Faculty',

                //FOC
                'Computing Faculty',

                //Postal Department
                'Postal Department'
            ]
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
                enum: ['Lecturer','Dean','Department Head','PostalDepartmentMA','FacultyMA','DepartmentMA','WorkAid','Super Admin','Technical Officer', 'Demonstrator'] 
            },
        }],
        
        
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
    currentHolderRegistrationNumber: {
        type: String,
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
            name: {
                type: String,
                required : true
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