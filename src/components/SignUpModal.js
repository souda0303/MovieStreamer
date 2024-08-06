import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  Alert,
  FormControl,
  InputLabel,
  styled,
  InputBase,
  alpha,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #fff",
  boxShadow: 24,
  p: 4,
  borderRadius: "25px",
};

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "#F3F6F9" : "#1A2027",
    border: "1px solid",
    borderColor: theme.palette.mode === "light" ? "#E0E3E7" : "#2D3843",
    fontSize: 16,
    width: "100%", // Ensure the input field takes full width
    padding: "10px 12px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

const SignUpModal = ({ open, handleClose }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    number: "",
    password: "",
    confirmPassword: "",
  });

  const [alert, setAlert] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAlert(true);
    setDialogOpen(true);
    console.log(formData);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setAlert(false); // Close the alert as well when closing the dialog
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="sign-up-modal-title"
        aria-describedby="sign-up-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography
            sx={{ textAlign: "center", fontSize: "36px", fontWeight: "600" }}
            id="sign-up-modal-title"
            variant="h6"
            component="h2"
          >
            Sign in to MovieStreamer
          </Typography>
          <form onSubmit={handleSubmit}>
            <FormControl variant="standard" fullWidth margin="normal">
              <InputLabel
                shrink
                htmlFor="username-input"
                sx={{ fontSize: "24px", fontWeight: "400", color: "black" }}
              >
                Username
              </InputLabel>
              <BootstrapInput
                id="username-input"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl variant="standard" fullWidth margin="normal">
              <InputLabel
                shrink
                htmlFor="email-input"
                sx={{ fontSize: "24px", fontWeight: "400", color: "black" }}
              >
                Email
              </InputLabel>
              <BootstrapInput
                id="email-input"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl variant="standard" fullWidth margin="normal">
              <InputLabel
                shrink
                htmlFor="number-input"
                sx={{ fontSize: "24px", fontWeight: "400", color: "black" }}
              >
                Number
              </InputLabel>
              <BootstrapInput
                id="number-input"
                name="number"
                value={formData.number}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl variant="standard" fullWidth margin="normal">
              <InputLabel
                shrink
                htmlFor="password-input"
                sx={{ fontSize: "24px", fontWeight: "400", color: "black" }}
              >
                Password
              </InputLabel>
              <BootstrapInput
                id="password-input"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl variant="standard" fullWidth margin="normal">
              <InputLabel
                shrink
                htmlFor="confirm-password-input"
                sx={{ fontSize: "24px", fontWeight: "400", color: "black" }}
              >
                Confirm Password
              </InputLabel>
              <BootstrapInput
                id="confirm-password-input"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </FormControl>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mt: 2,
              }}
            >
              <Button
                type="submit"
                variant="contained"
                sx={{
                  width: "160px",
                  backgroundColor: "#D9D9D9",
                  color: "black",
                }}
              >
                Sign In
              </Button>
            </Box>
          </form>
          {alert && (
            <Alert
              onClose={() => setAlert(false)}
              severity="success"
              sx={{ mt: 2 }}
            >
              Sign-up successful!
            </Alert>
          )}
        </Box>
      </Modal>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Submitted Details</DialogTitle>
        <DialogContent>
          <Typography>Username: {formData.username}</Typography>
          <Typography>Email: {formData.email}</Typography>
          <Typography>Number: {formData.number}</Typography>
          <Typography>Password: {formData.password}</Typography>
          <Typography>Confirm Password: {formData.confirmPassword}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SignUpModal;
