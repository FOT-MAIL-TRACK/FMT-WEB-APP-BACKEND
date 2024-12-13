const mongoose = require('mongoose');
const User = require('../models/user');
const Letter = require('../models/letter')

//function uniqueID for for internal letters

const generateInternalLetterID = () => {
    const prefix = 'INT';
    const uniquePart = Date.now().toString().slice(-4)+ '-' + Math.floor(Math.random() * 10000);
    return `${prefix}-${uniquePart}`;
}

const generateExternalLetterID = () => {
    const prefix = 'EXT'; 
    const uniquePart = Date.now().toString().slice(-4)+ '-' + Math.floor(Math.random() * 10000);
    return `${prefix}-${uniquePart}`;
}


//create a new Internal letter
exports.createInternalLetter = async (req,res) => {
    try{
        const {  sender, receiver } = req.body;
        // Generate QR code data
        // const qrCode = await QRCode.toDataURL(JSON.stringify({sender,receiver}));

        //create UniqueId for internalletter/parcel
        const uniqueID = generateInternalLetterID();

        // if (isInternal) {
        //     uniqueId = `${sender.registrationNumber}-${receiver.registrationNumber}-${Date.now()}`;
        // }

        const currentHolder = await User.findOne({ registrationNumber: sender.registrationNumber });

        if (!currentHolder) {
            return res.status(404).json({ message: 'Current holder (receiver) not found' });
        }
          

        const newLetter = new Letter({
            sender: {
                name : sender.name,
                registrationNumber: sender.registrationNumber,
                address: sender.address,
                faculty: sender.faculty,
                department: sender.department
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
            currentHolder: currentHolder._id,
            currentHolderRegistrationNumber : currentHolder.registrationNumber,
            uniqueID: uniqueID ,
            trackingLog: [{
                holder: currentHolder._id,
                name: currentHolder.name,
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
        const uniqueID = generateExternalLetterID();

        // if (isInternal) {
        //     uniqueId = `${sender.registrationNumber}-${receiver.registrationNumber}-${Date.now()}`;
        // }
        if (!sender || !receiver) {
            return res.status(400).json({ message: "Sender and receiver details are required." });
        }

        const newLetter = new Letter({
            sender: {
                name : sender.name,
                address: sender.address,
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
            currentHolder: null,
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

        // Find letter by id and populate tracking log holders
        const letter = await Letter.findById(id).populate('currentHolder trackingLog.holder' , 'name department registrationNumber');
        if (!letter) {
            return res.status(404).json({ message: 'Letter not found' });
        }

        // Extract relevant data for frontend
        const letterData = {
            uniqueId: letter.uniqueID,
            sender: letter.sender,
            senderDepartment: letter.senderDepartment,
            receiver: letter.receiver,
            receiverDepartment: letter.receiverDepartment,
            authorities: letter.authorities,
            trackingLog: letter.trackingLog.map(log => ({
                // holder: log?.holder?.name || 'Unknown Holder', 
                // department: log?.holder?.department || 'Unknown Department',
                // status: log.status || 'Unknown Status',  
                // date: log.date || 'No Date Available'
            })),
            isDelivered: letter.isDelivered,
            currentHolder: letter.currentHolder.name,
            currentHolderRegistrationNumber: letter.currentHolderRegistrationNumber
        };

        res.status(200).json(letterData);
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

exports.getAllLetters = async (req, res) => {
    try {
        const letters = await Letter.find(); // Assuming Letter is your model

        res.status(200).json({ letters });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// exports.getLetterbyRegno = async (req, res) => {
//     const { registrationNumber } = req.params;
//     const { sortBy } = req.query; 
//     try {
//         const sortCriteria = sortBy === 'date' ? { createdAt: -1} : {};
//         const letters = await Letter.find({
//             $or: [
//                 { 'sender.registrationNumber': registrationNumber }, // Sent by user
//                 { 'receiver.registrationNumber': registrationNumber }, // Received by user
//                 { 'receiver.authorities.registrationNumber': registrationNumber }
//             ]
//         })
//         .sort(sortCriteria);

//         res.json(letters);
//     } catch (error) {
//         console.error("Error retrieving letters:", error);
//         res.status(500).send('Error retrieving letters');
//     }
// }


exports.getLetterbyRegno = async (req, res) => {
    const { registrationNumber } = req.params;
    const { sortBy, department, faculty, date, uniqueID } = req.query;

    try {
        const query = {
            $or: [
                { 'sender.registrationNumber': registrationNumber },
                { 'receiver.registrationNumber': registrationNumber },
                { 'receiver.authorities.registrationNumber': registrationNumber }
            ]
        };

        // Filter by department if provided
        if (department) query['sender.department' || 'receiver.department'] = department;

        // Filter by faculty if provided
        if (faculty) query['sender.faculty' || 'receiver.faculty'] = faculty;

        // Filter by letterType (using uniqueID prefix)
        if (uniqueID) {
            const regexPattern = `^${uniqueID}`;
            query['uniqueID'] = new RegExp(regexPattern);
        }

        // Add date filter if provided
        if (date) {
            const selectedDate = new Date(date);
            const startOfDay = new Date(selectedDate.setHours(0, 0, 0, 0));
            const endOfDay = new Date(selectedDate.setHours(23, 59, 59, 999));
            query.createdAt = { $gte: startOfDay, $lte: endOfDay };
        }

        console.log("Constructed Query:", JSON.stringify(query, null, 2));

        const sortCriteria = sortBy === 'date' ? { createdAt: -1 } : {};
        const letters = await Letter.find(query).sort(sortCriteria);

        console.log("Filtered Letters:", letters);
        res.json(letters);
    } catch (error) {
        console.error("Error retrieving letters:", error);
        res.status(500).send('Error retrieving letters');
    }
};



