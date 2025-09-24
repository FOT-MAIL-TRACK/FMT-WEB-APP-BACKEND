import React, { useEffect, useState } from "react";
import { Typography, Card, CardContent, Grid, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@mui/material";
import UsersTable from "../components/UsersTable";
import RealNavBar from "../components/realNavBar";
import NavBar from "../components/NavBar";
import Footer from "../components/footer";
import PaginationComponent from "../components/PaginationComponent";

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5); 
  const [editingUser, setEditingUser] = useState(null); // User being edited

  useEffect(() => {
    fetch("http://localhost:5001/api/admin/users", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const totalPages = Math.ceil(users.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedUsers = users.slice(startIndex, startIndex + pageSize);

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await fetch(`http://localhost:5001/api/admin/users/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setUsers(users.filter(u => u._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditClick = (user) => {
    setEditingUser(user); // Open modal with selected user
  };

  const handleEditSave = async () => {
    try {
      const response = await fetch(`http://localhost:5001/api/admin/users/${editingUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(editingUser),
      });
      const data = await response.json();
      setUsers(users.map(u => (u._id === data._id ? data : u)));
      setEditingUser(null); // Close modal
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <RealNavBar />
      <div style={{ marginTop: "100px" }}>
        <NavBar />
      </div>
      <Grid container spacing={3} padding={3}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Manage Users
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <UsersTable 
                users={paginatedUsers} 
                onEdit={handleEditClick} 
                onDelete={handleDeleteUser} 
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <PaginationComponent
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </Grid>
      </Grid>
      <Footer />

      {/* Edit User Modal */}
      <Dialog open={!!editingUser} onClose={() => setEditingUser(null)}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={editingUser?.name || ''}
            onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Registration Number"
            value={editingUser?.registrationNumber || ''}
            onChange={(e) => setEditingUser({ ...editingUser, registrationNumber: e.target.value })}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Role"
            value={editingUser?.role || ''}
            onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Faculty"
            value={editingUser?.faculty || ''}
            onChange={(e) => setEditingUser({ ...editingUser, faculty: e.target.value })}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Department"
            value={editingUser?.department || ''}
            onChange={(e) => setEditingUser({ ...editingUser, department: e.target.value })}
            fullWidth
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditingUser(null)} color="secondary">Cancel</Button>
          <Button onClick={handleEditSave} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AdminUsersPage;
