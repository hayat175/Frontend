import React, { useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button, Alert } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { LOGOUT } from "../redux/actions";
import axios from "axios";
import Input from "./fields/Input";

const drawerWidth = 240;

function Dashboard(props) {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState("");
  const [success, setSuccess] = useState("");
  const [formdata, setFormData] = useState({
    userfile: "",
  });
  const { user } = useSelector((state) => state.loginReducer);
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  console.log(user);
  const [uploadedfile, setuploadedfile] = useState("");
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    dispatch({
      type: LOGOUT,
    });
  };
  console.log(user);
  const handleUploadImage = async (e) => {
    console.log(e.target.files[0]);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASEURL}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.status === 200) {
        console.log();
        setuploadedfile(res.data);
        setErrors("");
        setSuccess("File Uploaded Successfully");
      }
    } catch (error) {
      console.log(error);
      setErrors(error.response.data);
      console.log(error.response);
      setSuccess("");
    }
  };

  const config = {
    headers: { Authorization: `Bearer ${user?.token}` },
  };

  const handleChange = (e) => {
    // const selectValue = e.target.value;
    setFormData({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleAssignUpload = async () => {
    if (!uploadedfile) {
      setErrors("File is required");
      return;
    }
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASEURL}/client/documents`,
        {
          name: formdata.userfile,
          path: uploadedfile?.path,
          size: uploadedfile?.size,
        },
        // formData
        config
      );
      if (res.status === 200) {
        console.log(res);

        setErrors("");
        setSuccess("File Uploaded Successfully");
      }
    } catch (error) {
      console.log(error);
      setErrors(error.response.data);
      console.log(error.response);
      setSuccess("");
    }
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Upload Docs" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding onClick={handleLogout}>
          <ListItemButton>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
          <Typography variant="h6" noWrap component="div">
            Welcome {user?.user?.item?.firstName}
            Role: {user?.user?.kind}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Box>
          <Box mb={3}>
            {errors !== "" && <Alert severity="error">{errors}!</Alert>}
            {success !== "" && <Alert severity="success">{success}</Alert>}
          </Box>
          <Input
            label="File Name"
            value="userfile"
            type="text"
            formdata={formdata}
            handleChange={handleChange}
          />
          <input type="file" onChange={handleUploadImage}></input>
          <Button variant="contained" onClick={handleAssignUpload}>
            Upload
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

Dashboard.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Dashboard;
