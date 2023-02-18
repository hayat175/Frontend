import { useState, useEffect } from "react";
import axios from "axios";
import Input from "./fields/Input";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Alert from "@mui/material/Alert";
import Select from "@mui/material/Select";
import {
  MenuItem,
  Paper,
  Typography,
  Stack,
  InputLabel,
  Link,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN } from "../redux/actions";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.loginReducer);
  const [formdata, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn]);

  const handleChange = (e) => {
    // const selectValue = e.target.value;
    setFormData({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    console.log(formdata);
    event.preventDefault();
    console.log("submit");

    try {
      const res = await axios.post(`${process.env.REACT_APP_BASEURL}/login`, {
        username: formdata.username,
        password: formdata.password,
      });
      if (res.status === 200) {
        console.log(res.data);
        dispatch({
          type: LOGIN,
          payload: res.data,
        });
        navigate("/dashboard");
        setErrors("");
        setSuccess("Login successfully");
      }
    } catch (error) {
      console.log(error);
      setErrors(error.response.data);
      console.log(error.response);
      setSuccess("");
    }
  };
  return (
    <Stack sx={{ minHeight: "100vh" }} alignItems="center">
      <Paper elevation={4} sx={{ p: 4, width: "600px", margin: "auto" }}>
        <Typography variant="h4" align="center" sx={{ fontWeight: "bold" }}>
          Login
        </Typography>
        {errors !== "" && <Alert severity="error">{errors}!</Alert>}
        {success !== "" && <Alert severity="success">{success}</Alert>}
        <form>
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

          <Button
            sx={{ mt: 3, fontWeight: "bold" }}
            variant="contained"
            type="submit"
            onClick={(e) => handleSubmit(e)}
            endIcon={<SendIcon />}
          >
            Login
          </Button>
        </form>
        <Box align="center" mt={3}>
          <Link href="/">Dont have a account! Signup</Link>
        </Box>
      </Paper>
    </Stack>
  );
};

export default Login;
