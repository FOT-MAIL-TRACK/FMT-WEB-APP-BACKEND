import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

const LettersTable = ({ letters }) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Unique ID</TableCell>
        <TableCell>Letter Type</TableCell> 
        <TableCell>Sender</TableCell>
        <TableCell>Receiver</TableCell>
        <TableCell>Status</TableCell>
        <TableCell>Current Holder</TableCell>
        <TableCell>Tracking Logs</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {letters.map(letter => {
        const uniqueColor = letter.uniqueID.startsWith('EXT') ? 'red' : letter.uniqueID.startsWith('INT') ? 'green' : 'grey';
        return (  
        <TableRow key={letter._id}>
          <TableCell sx={{ color: uniqueColor, fontWeight: 'bold' }}>
              {letter.uniqueID}
          </TableCell>
          <TableCell>{letter.letterType}</TableCell> 
          <TableCell>{letter.sender?.name}</TableCell>
          <TableCell>{letter.receiver?.name}</TableCell>
          <TableCell>{letter.status || 'Pending'}</TableCell>
          <TableCell>{letter.currentHolder?.name || 'N/A'}</TableCell>
          <TableCell>
            {letter.trackingLog?.map((log, i) => (
              <div key={i}>
                {log.status} → {log.holder?.name} ({new Date(log.date).toLocaleDateString()})
              </div>
            ))}
          </TableCell>
        </TableRow>
        );
      })}
    </TableBody>
  </Table>
);

export default LettersTable;
