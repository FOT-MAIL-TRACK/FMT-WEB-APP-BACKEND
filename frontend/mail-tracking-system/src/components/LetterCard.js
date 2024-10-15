import React, {useState} from 'react';
import { CheckCircle, RadioButtonUnchecked } from '@mui/icons-material';
import './LetterCard.css'; 
import PaginationComponent from './PaginationComponent';


const LetterCard = ({ letter }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 4;

    if (!letter) {
        return <p>Loading...</p>; // Handle loading state
    }

    const uniqueId = letter?.uniqueId || 'No ID Available';

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return(
        <div className="letter-card">
            <h3>Letter Unique ID: {uniqueId}</h3>
            <p>Sender: {letter.sender?.name || 'No Sender Info'} ({letter.senderDepartment || 'No Department'})</p>
            <p>Receiver: {letter.receiver?.name || 'No Receiver Info'} ({letter.receiverDepartment || 'No Department'})</p>
            <div className="progress">
                <CheckCircle />
                <span>{letter.sender?.name || 'No Sender Info'}</span>
                <CheckCircle />
                {letter.isDelivered ? <CheckCircle /> : <RadioButtonUnchecked />}
                <span>{letter.receiver?.name || 'No Receiver Info'}</span>
            </div>
            <p>{letter.isDelivered ? "Letter reached receiver" : "Letter still not reached receiver"}</p>
            <PaginationComponent 
                totalPages={totalPages} 
                currentPage={currentPage} 
                setCurrentPage={setCurrentPage} 
            />
        </div>
    )
}

export default LetterCard;
