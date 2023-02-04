import { useState } from "react";
import axios from "axios";
import Input from "./fields/Input";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Alert from "@mui/material/Alert";
import Select from "@mui/material/Select";
import { MenuItem, Paper, Typography, Stack, InputLabel } from "@mui/material";

const Signup = () => {
  const [formdata, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    dob: "",
    age: "",
    usertype: "admin",
  });
  const [errors, setErrors] = useState("");
  const [success, setSuccess] = useState("");
  const [show, setShow] = useState(false);

  const handleChange = (e) => {
    const selectValue = e.target.value;
    setFormData({ ...formdata, [e.target.name]: e.target.value });
    if (selectValue === "client") {
      setShow(true);
    } else {
      setShow(false);
    }
  };
  const handleSubmit = async (event) => {
    console.log(formdata);
    event.preventDefault();
    console.log("submit");

    try {
      const res = await axios.post(`${process.env.REACT_APP_BASEURL}/signup`, {
        userName: formdata.username,
        password: formdata.password,
        userType: formdata.usertype,
        data: {
          firstName: formdata.firstname,
          lastName: formdata.lastname,
        },
      });
      if (res.status === 200) {
        setErrors("");
        setSuccess("Record added successfully");
      }
    } catch (error) {
      setErrors(error.response.data.error);
      console.log(error.response);
      setSuccess("");
    }
  };
  return (
    <Stack sx={{ minHeight: "100vh" }} alignItems="center">
      <Paper elevation={4} sx={{ p: 4, width: "600px", margin: "auto" }}>
        <Typography variant="h4" align="center" sx={{ fontWeight: "bold" }}>
          Signup
        </Typography>
        {errors !== "" && <Alert severity="error">{errors}!</Alert>}
        {success !== "" && <Alert severity="success">{success}</Alert>}
        <form>
          <Input
            label="Enter first name"
            value="firstname"
            type="text"
            formdata={formdata}
            maxlength="10"
            placeholder="Enter first name"
            handleChange={handleChange}
          />

          <Input
            label="Enter last name"
            value="lastname"
            type="text"
            formdata={formdata}
            handleChange={handleChange}
          />

          <Input
            label="Enter user name"
            value="username"
            type="text"
            formdata={formdata}
            handleChange={handleChange}
          />

          <Input
            label="Enter password"
            value="password"
            type="password"
            formdata={formdata}
            handleChange={handleChange}
          />

          {show && (
            <>
              <Input
                label="Enter DOB"
                value="dob"
                type="text"
                formdata={formdata}
                handleChange={handleChange}
              />

              <Input
                label="Enter age"
                value="age"
                type="text"
                formdata={formdata}
                handleChange={handleChange}
              />
            </>
          )}
          <InputLabel id="demo-simple-select-label">Enter usertype</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            name="usertype"
            fullWidth
            margin="normal"
            id="demo-simple-select"
            label="Enter usertype"
            value={formdata.usertype}
            onChange={(e) => handleChange(e)}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="client">Client</MenuItem>
          </Select>
          <Button
            sx={{ mt: 3, fontWeight: "bold" }}
            variant="contained"
            type="submit"
            onClick={(e) => handleSubmit(e)}
            endIcon={<SendIcon />}
          >
            Signup
          </Button>
        </form>
      </Paper>
    </Stack>
  );
};

export default Signup;
