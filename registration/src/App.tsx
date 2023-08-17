import "./App.css";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { request } from "./axios-config.ts";
import Swal from "sweetalert2";


function App() {

  const [fname, setFname] = useState<string>("");
  const [lname, setLname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const [requirements, setRequirements] = useState<string>("");

  const [errorfname, setErrorfname] = useState<string>("");
  const [errorlname, setErrorlname] = useState<string>("");
  const [erroremail, setErroremail] = useState<string>("");
  const [errorpass, setErrorpass] = useState<string>("");


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (fname.length < 2 || lname.length < 2) {
      Swal.fire({
        title: "Error!",
        text: "First name and last name must be at least 2 characters long.",
        icon: "error",
        customClass: {
          popup: "custom-popup",
        },
      });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      Swal.fire({
        title: "Error!",
        text: "Please enter a valid email address.",
        icon: "error",
        customClass: {
          popup: "custom-popup",
        },
      });
      return;
    }

    if (pass.length < 6) {
      Swal.fire({
        title: "Error!",
        text: "Password must be at least 2 characters long.",
        icon: "error",
        customClass: {
          popup: "custom-popup",
        },
      });
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, proceed!",
      customClass: {
        popup: "custom-popup",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const inputData = {
            fname: fname,
            lname: lname,
            email: email,
            pass: pass,
            requirements: requirements,
          };

          const response = await request.post("/register", inputData);
          console.log(response);

          Swal.fire({
            title: "Success!",
            text: "Registration completed.",
            icon: "success",
            customClass: {
              popup: "custom-popup",
            },
          }).then(() => {
            window.location.reload();
          });
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "An error occurred during registration.",
            icon: "error",
            customClass: {
              popup: "custom-popup",
            },
          });
        }
      } else {
        Swal.fire({
          title: "Cancelled",
          text: "Registration was cancelled.",
          icon: "info",
          customClass: {
            popup: "custom-popup",
          },
        });
      }
    });
  };

  return (
    <>
      <Container maxWidth="sm">
        <Paper
          elevation={20}
          sx={{ bgcolor: "white", height: "100vh", borderRadius: 5, p: 5 }}
        >
          <Typography variant="h4" component="h3" fontFamily={"Prompt"}>
            Register
          </Typography>

          <Box component="form" sx={{ mt: 6 }} onSubmit={handleSubmit}>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  helperText={errorfname || ""}
                  error={Boolean(errorfname)}
                  onChange={(e) => {
                    setFname(e.target.value);
                    if (e.target.value.length < 2) {
                      setErrorfname('should be more than 2 characters');
                    } else {
                      setErrorfname('');
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  helperText={errorlname || ""}
                  error={Boolean(errorlname)}
                  onChange={(e) => {
                    setLname(e.target.value);
                    if (e.target.value.length < 2) {
                      setErrorlname('should be more than 2 characters');
                    } else {
                      setErrorlname('');
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  error={Boolean(erroremail)}
                  helperText={erroremail || ""}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value)) {
                      setErroremail("Please enter a valid email address.");
                    } else {
                      setErroremail("");
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => {
                    setPass(e.target.value);
                    if (e.target.value.length < 6) {
                      setErrorpass('Password should be at least 6 characters');
                    } else {
                      setErrorpass('');
                    }
                  }}
                  error={Boolean(errorpass)}
                  helperText={errorpass || ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="outlined-multiline-static"
                  label="Requirements"
                  multiline
                  fullWidth
                  rows={4}
                  onChange={(e) => setRequirements(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="success"
                  sx={{ borderRadius: 5, width: "150px" }}
                  type="submit"
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Box>
          <Typography
            variant="body2"
            sx={{ color: "#8b8f8b", mt: 7, fontFamily: "prompt" }}
          >
            Thank you<br></br> BlueSeas Enterprise Co., Ltd.,
          </Typography>
        </Paper>
      </Container>
    </>
  );
}

export default App;
