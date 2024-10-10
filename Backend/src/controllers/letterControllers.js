const mongoose = require('mongoose');
const User = require('../models/user');
const Letter = require('../models/letter')

//function uniqueID for for internal letters

const generateInternalLetterID = (senderReg, receiverReg) => {
    const timestap = Date.now();
    const rawID = `${senderReg}-${receiverReg}-${timestap}`;
    return Buffer.from(rawID).toString('base64');
}

const generateExternalLetterID = (senderName, senderAddress, receiverReg) => {
    const timestap = Date.now();
    const rawID = `${senderName}-${senderAddress}-${receiverReg}-${timestap}`;
    return Buffer.from(rawID).toString('base64');
}


//create a new Internal letter
exports.createInternalLetter = async (req,res) => {
    try{
        const {  sender, receiver } = req.body;
        // Generate QR code data
        // const qrCode = await QRCode.toDataURL(JSON.stringify({sender,receiver}));

        //create UniqueId for internalletter/parcel
        const uniqueID = generateInternalLetterID(sender.registrationNumber ,receiver.registrationNumber);

        // if (isInternal) {
        //     uniqueId = `${sender.registrationNumber}-${receiver.registrationNumber}-${Date.now()}`;
        // }

        const currentHolder = await User.findOne({ registrationNumber: receiver.registrationNumber });

        if (!currentHolder) {
            return res.status(404).json({ message: 'Current holder (receiver) not found' });
          }
          

        const newLetter = new Letter({
            sender: {
                name : sender.name,
                registrationNumber: sender.registrationNumber,
                address: sender.address
            },
            receiver: {
                name: receiver.name,
                registrationNumber: receiver.registrationNumber,
                receiverRole: receiver.receiverRole,// Final receiver's role
                authorities: receiver.authorities, // Array of authority objects
                faculty: receiver.faculty,
                department: receiver.department
            },
            // isInternal :true, 
            currentHolder: currentHolder._id ,
            uniqueID: uniqueID ,
            trackingLog: [{
                holder: currentHolder._id,
                status: 'Pending'
            }] 
        });
        const savedLetter = await newLetter.save();
        res.status(201).json(savedLetter);
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
}

//create a new External letter
exports.createExternalLetter = async (req,res) => {
    try{
        const {  sender, receiver } = req.body;
        // Generate QR code data
        // const qrCode = await QRCode.toDataURL(JSON.stringify({sender,receiver}));

        //create UniqueId for internalletter/parcel
        const uniqueID = generateExternalLetterID(sender.name, sender.address ,receiver.registrationNumber);

        // if (isInternal) {
        //     uniqueId = `${sender.registrationNumber}-${receiver.registrationNumber}-${Date.now()}`;
        // }
        if (!sender || !receiver) {
            return res.status(400).json({ message: "Sender and receiver details are required." });
        }

        const newLetter = new Letter({
            sender: {
                name : sender.name,
                address: sender.address
            },
            receiver: {
                name: receiver.name,
                registrationNumber: receiver.registrationNumber,
                receiverRole: receiver.receiverRole,// Final receiver's role
                authorities: receiver.authorities, // Array of authority objects
                faculty: receiver.faculty,
                department: receiver.department
            },
            isInternal: false, 
            currentHolder: null ,
            uniqueID: uniqueID, 
            trackingLog: [] // External letters may not have tracking logs initially
        });
        const savedLetter = await newLetter.save();
        res.status(201).json(savedLetter);
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
}


//get letters
exports.getLetterById = async (req, res) => {
    try {
        const { id } = req.params;

        const letter = await Letter.findById(id).populate('currentHolder trackingLog.holder');
        if (!letter) {
            return res.status(404).json({ message: 'Letter not found' });
        }

        res.status(200).json(letter);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//update letter status (common for both internal and external letters)

exports.updateLetterStatus = async (req,res) => {

    const  { letterId}  = req.params;
    const { status, holder} = req.params;
    try{
        const letter = await Letter.findById(letterId);
        if(!letter){
            return res.status(404).json({ error: 'Letter not found' });
        }

        letter.status = status;
        letter.currentHolder = holder;
        letter.trackingLog.push({
            holder,
            status
        });
        letter.updatedAt = new Date();

        await letter.save();
        res.status(200).json(letter);
    }
    catch(err){
        res.status(400).json({ error: error.message });
    }
}