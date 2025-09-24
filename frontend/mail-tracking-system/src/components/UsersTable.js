import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

const UsersTable = ({ users, onEdit, onDelete }) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Name</TableCell>
        <TableCell>Reg No</TableCell>
        <TableCell>Role</TableCell>
        <TableCell>Faculty</TableCell>
        <TableCell>Department</TableCell>
        <TableCell>Actions</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {users.map(user => (
        <TableRow key={user._id}>
          <TableCell>{user.name}</TableCell>
          <TableCell>{user.registrationNumber}</TableCell>
          <TableCell>{user.role}</TableCell>
          <TableCell>{user.faculty}</TableCell>
          <TableCell>{user.department}</TableCell>
          <TableCell>
            <button
              onClick={() => onEdit(user)}
              style={{
                backgroundColor: '#4CAF50', // Green
                color: 'white',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '4px',
                cursor: 'pointer',
                marginRight: '8px',
                fontSize: '0.9rem'
              }}
            >
              Edit
            </button>

            <button
              onClick={() => onDelete(user._id)}
              style={{
                backgroundColor: '#F44336', // Red
                color: 'white',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}
            >
              Delete
            </button>
          </TableCell>

        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default UsersTable;
