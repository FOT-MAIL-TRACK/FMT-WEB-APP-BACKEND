const mongoose = require('mongoose');
const User = require('../models/user');
const Letter = require('../models/letter')
const QRCode = require('qrcode');


//create a new letter
exports.createLetter = async (req,res) => {
    try{
        const {  sender, receiver } = req.body;
        // Generate QR code data
        const qrCode = await QRCode.toDataURL(JSON.stringify({sender,receiver}));

        const currentHolder = await User.findOne({ registrationNumber: sender.registrationNumber });
        if (!currentHolder) {
            return res.status(404).json({ message: 'Current holder (sender) not found' });
        }

        const newLetter = new Letter({
            sender: {
                registrationNumber: sender.registrationNumber,
                address: sender.address
            },
            receiver: {
                name: receiver.name,
                registrationNumber: receiver.registrationNumber,
                receiverRole: receiver.receiverRole,// Final receiver's role
                authorities: receiver.authorities, // Array of authority objects
                faculty: receiver.faculty,
                department: receiver.department,
                 
            },
            currentHolder: currentHolder._id,
            qrCode,
            trackingLog: [{
                holder: currentHolder._id,
                status: 'Pending'
            }]
        })
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

//update letter status

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