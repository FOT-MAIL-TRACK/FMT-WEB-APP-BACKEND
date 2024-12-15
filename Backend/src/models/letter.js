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
            required: true,
            enum: ['FOT','FMSC','FOE','FHSS','FAHS','FAS','FMS','FDS','FUAB','FOC','Postal Department','General Administration']
        },
        department: {
            type: String,
            required: true,
            enum: ['no department','ICT', 'BST', 'MMT', 'SFT', 'CET', 'Accounting', 'Business Administration','Business Economics','Commerce','Decision Sciences','Entrepreneurship','Estate Management and Valuation','Finance','Human Resource Management','Information Technology','Marketing Management','Public Administration','Civil Engineering','Computer Engineering','Electrical and Electronic Engineering','Mechanical Engineering','Interdisciplinary Studies','Anthropology','Criminology and Criminal Justice','Economics','English and Linguistics','English Language Teaching','Geography','History and Archaeology','Information & Communication Technology','Languages, Cultural Studies and Performing Arts','Music and Creative Technology','Pali and Buddhist Studies','Philosophy and Psychology','Political Science','Sinhala and Mass Communication','Social Statistics','Sociology','Nursing and Midwifery','Pharmacy and Pharmaceutical Sciences','Medical Laboratory Sciences','Basic Sciences','Optometry','Botany','Computer Science','Food Science and Technology','Physics','Sports Science','Zoology','Chemistry','Forestry and Environmental Sciences','Mathematics','Polymer Science','Statistics','Genetics and Molecular Biology Unit','Anatomy','Biochemistry','Community Medicine','Family Medicine','Forensic Medicine','Immunology & Molecular Medicine','Medical Education','Medicine','Microbiology','Obstetrics & Gynaecology','Paediatrics','Parasitology','Pathology','Pharmacology','Physiology','Psychiatry','Surgery','Basic Sciences','Community Dental Health','Comprehensive & Geriatric Dentistry','Oral Medicine & Periodontology','Oral Pathology','Oral Surgery','Paraclinical Sciences','Prosthodontics','Restorative Dentistry','Urban Bioresources','Aquatic Bioresources','Multidisciplinary Studies','Information Systems Engineering and Informatics','Knowledge Engineering and Communication','Scientific Computing']
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
            enum: ['Dean','Department Head','Lecturer','PostalDepartmentMA','FacultyMA','DepartmentMA','WorkAid','Admin','Technical Officer', 'Demonstrator'] 
        },
        faculty: {
            type: String,
            required: true,
            enum: ['FOT','FMSC','FOE','FHSS','FAHS','FAS','FMS','FDS','FUAB','FOC','Postal Department','General Administration']
        },
        department: {
            type: String,
            required: true,
            enum: ['no department','ICT', 'BST', 'MMT', 'SFT', 'CET', 'Accounting', 'Business Administration','Business Economics','Commerce','Decision Sciences','Entrepreneurship','Estate Management and Valuation','Finance','Human Resource Management','Information Technology','Marketing Management','Public Administration','Civil Engineering','Computer Engineering','Electrical and Electronic Engineering','Mechanical Engineering','Interdisciplinary Studies','Anthropology','Criminology and Criminal Justice','Economics','English and Linguistics','English Language Teaching','Geography','History and Archaeology','Information & Communication Technology','Languages, Cultural Studies and Performing Arts','Music and Creative Technology','Pali and Buddhist Studies','Philosophy and Psychology','Political Science','Sinhala and Mass Communication','Social Statistics','Sociology','Nursing and Midwifery','Pharmacy and Pharmaceutical Sciences','Medical Laboratory Sciences','Basic Sciences','Optometry','Botany','Computer Science','Food Science and Technology','Physics','Sports Science','Zoology','Chemistry','Forestry and Environmental Sciences','Mathematics','Polymer Science','Statistics','Genetics and Molecular Biology Unit','Anatomy','Biochemistry','Community Medicine','Family Medicine','Forensic Medicine','Immunology & Molecular Medicine','Medical Education','Medicine','Microbiology','Obstetrics & Gynaecology','Paediatrics','Parasitology','Pathology','Pharmacology','Physiology','Psychiatry','Surgery','Basic Sciences','Community Dental Health','Comprehensive & Geriatric Dentistry','Oral Medicine & Periodontology','Oral Pathology','Oral Surgery','Paraclinical Sciences','Prosthodontics','Restorative Dentistry','Urban Bioresources','Aquatic Bioresources','Multidisciplinary Studies','Information Systems Engineering and Informatics','Knowledge Engineering and Communication','Scientific Computing']
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