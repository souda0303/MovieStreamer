import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/Homepage/HomePage";
import MovieDetailsPage from "./pages/MovieDetailsPage/MovieDetailsPage";
import SignUpModal from "./components/SignUpModal";

function App() {
  const [isSignUpModalOpen, setSignUpModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSignUpClick = () => {
    setSignUpModalOpen(true);
  };

  const handleSignUpModalClose = () => {
    setSignUpModalOpen(false);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <Router>
      <Header onSignUpClick={handleSignUpClick} onSearch={handleSearch} />
      <SignUpModal
        open={isSignUpModalOpen}
        handleClose={handleSignUpModalClose}
      />
      <Routes>
        <Route path="/" element={<HomePage onSearch={handleSearch} searchQuery={searchQuery} />} />
        <Route path="/movie/:id" element={<MovieDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
