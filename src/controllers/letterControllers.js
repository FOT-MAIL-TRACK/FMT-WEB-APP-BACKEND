const mongoose = require('mongoose');
const Letter = require('../models/letter')
const QRCode = require('qrcode');


//create a new letter
exports.createLetter = async (req,res) => {
    try{
        const { title, content, sender, receiver, authorities } = req.body;
        // Generate QR code data
        const qrCode = await QRCode.toDataURL(JSON.stringify({title,content,sender,receiver,authorities}))

        const newLetter = new Letter({
            title,
            content,
            sender,
            receiver,
            authorities,
            currentHolder: sender,
            qrCode,
            trackingLog: [{
                holder: sender,
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
exports.getLetters = async (res,req) => {
    try{
        const letters = await Letter.find();
        res.status(200).json(letters);
    }
    catch(err){
        res.status(500).json({ message: err.message});
    }
}

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