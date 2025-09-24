import React, { useEffect, useState } from "react";
import { Typography, Card, CardContent, Grid } from "@mui/material";
import LettersTable from "../components/LettersTable";
import RealNavBar from "../components/realNavBar";
import NavBar from "../components/NavBar";
import Footer from "../components/footer";
import PaginationComponent from "../components/PaginationComponent";

const AdminLettersPage = () => {
  const [letters, setLetters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);

  useEffect(() => {
    fetch("http://localhost:5001/api/admin/letters", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then((data) => setLetters(data));
  }, []);

  const totalPages = Math.ceil(letters.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedLetters = letters.slice(startIndex, startIndex + pageSize);

  return (
    <>
      <RealNavBar />
      <div style={{ marginTop: "100px" }}>
        <NavBar />
      </div>
      <Grid container spacing={3} padding={3}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Manage Letters
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <LettersTable letters={paginatedLetters} />
            </CardContent>
          </Card>
        </Grid>

        {/* Pagination OUTSIDE the table card */}
        <Grid item xs={12}>
          <PaginationComponent
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};

export default AdminLettersPage;
