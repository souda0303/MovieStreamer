import React, { useState, useRef, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  InputBase,
  IconButton,
  Popper,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = ({ onSignUpClick, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const searchRef = useRef(null);
  const popperRef = useRef(null);

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (event.key === "Enter" || event.type === "click") {
      onSearch(query);
      if (query) {
        if (!searchHistory.includes(query)) {
          const newHistory = [query, ...searchHistory.slice(0, 3)];
          setSearchHistory(newHistory);
        }
        setAnchorEl(null); // Hide popper after search
      }
    }
  };

  const handleDeleteHistoryItem = (item) => {
    const newHistory = searchHistory.filter(
      (historyItem) => historyItem !== item
    );
    setSearchHistory(newHistory);
  };

  const handleClearHistory = () => {
    setSearchHistory([]);
    setAnchorEl(null);
  };

  const handleClickAway = (event) => {
    // Ensure clicks within the search and popper don't trigger hide
    if (
      searchRef.current &&
      !searchRef.current.contains(event.target) &&
      popperRef.current &&
      !popperRef.current.contains(event.target)
    ) {
      setAnchorEl(null);
    }
  };

  const handleScroll = () => {
    // Hide the popper when scrolling
    setAnchorEl(null);
  };

  useEffect(() => {
    // Add global event listeners to handle click outside and scroll
    document.addEventListener("mousedown", handleClickAway);
    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickAway);
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleFocus = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <AppBar position="static" className="header" elevation={0}>
      <Toolbar className="toolbar">
        <Typography
          sx={{ fontSize: "21px" }}
          variant="h6"
          className="title"
          fontWeight="bold"
        >
          MovieStreamer
        </Typography>
        <div className="nav-links">
          <Button
            sx={{ fontSize: "20px" }}
            color="inherit"
            component={Link}
            to="/"
          >
            Movies
          </Button>
          <Button
            sx={{ fontSize: "20px" }}
            color="inherit"
            component={Link}
            to="/"
          >
            Series
          </Button>
          <Button
            sx={{ fontSize: "20px" }}
            color="inherit"
            component={Link}
            to="/"
          >
            Contact
          </Button>
          <Button
            sx={{ fontSize: "20px" }}
            color="inherit"
            component={Link}
            to="/"
          >
            About Us
          </Button>
        </div>
        <div className="search" ref={searchRef}>
          <InputBase
            placeholder="Search…"
            className="search-input"
            value={searchQuery}
            onChange={handleSearch}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                handleSearch(event);
              }
            }}
            onFocus={handleFocus}
          />
          <IconButton
            type="submit"
            aria-label="search"
            className="search-icon"
            onClick={handleSearch}
          >
            <SearchIcon />
          </IconButton>
        </div>
        <Button
          variant="outlined"
          onClick={onSignUpClick}
          sx={{
            borderRadius: "10px",
            fontSize: "18px",
            borderColor: "black",
            color: "black",
            "&:hover": {
              borderColor: "black",
              backgroundColor: "rgba(0, 0, 0, 0.1)",
            },
          }}
        >
          Sign Up
        </Button>
      </Toolbar>
      <Popper
        sx={{ zIndex: "1300" }}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        transition
        placement="bottom-start"
        ref={popperRef}
      >
        <Paper className="popper-paper" sx={{ backgroundColor: "rgba(255,255,255,0.5)", borderRadius: "15px" }}>
          <List>
            {searchHistory.map((item, index) => (
              <ListItem key={index}>
                <SearchIcon sx={{color: "GrayText", marginRight: "10px"}} />
                <ListItemText primary={item} />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    onClick={() => handleDeleteHistoryItem(item)}
                  >
                    <CloseIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
            {searchHistory.length > 0 && (
              <ListItem>
                <Button onClick={handleClearHistory}>Clear All</Button>
              </ListItem>
            )}
          </List>
        </Paper>
      </Popper>
    </AppBar>
  );
};

export default Header;
