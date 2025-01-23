import React from "react";
import { Box, List, ListItem, ListItemIcon, ListItemText, Typography, IconButton, Drawer } from "@mui/material";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import NotStartedIcon from "@mui/icons-material/NotStarted";
import RateReviewIcon from "@mui/icons-material/RateReview";
import BrandingWatermarkIcon from "@mui/icons-material/BrandingWatermark";
import EngineeringIcon from "@mui/icons-material/Engineering";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ListAltIcon from '@mui/icons-material/ListAlt';
import './Sidebar.css';

const Sidebar = ({ isSidebar, setIsSidebar }) => {
  const navigate = useNavigate(); // Initialize navigate
  const someId = "No PR number found"; // Example dynamic ID, replace it with your actual dynamic value

  const menuItems = [
    { title: "Dashboard", to: "/dashboard", icon: <HomeOutlinedIcon /> },
    { title: "Machine Form", to: "/machine-form", icon: <ListAltIcon /> },
    {
      title: "Initiate Feedback",
      onClick: () => navigate(`/initiate-feedback/${someId}`),
      icon: <NotStartedIcon />
    },
    { title: "IE Feedback", to: "/ie-feedback", icon: <RateReviewIcon /> },
    { title: "ME Screens", to: "/me-screens", icon: <BrandingWatermarkIcon /> },
    { title: "Maintenance Form", to: "/maintenance-form", icon: <EngineeringIcon /> },
    { title: "Project Form", to: "/project-form", icon: <MapOutlinedIcon /> },
  ];

  const chartItems = [
    { title: "Bar Chart", to: "/bar-chart", icon: <BarChartOutlinedIcon /> },
    { title: "Pie Chart", to: "/pie-chart", icon: <PieChartOutlineOutlinedIcon /> },
    { title: "Line Chart", to: "/line-chart", icon: <TimelineOutlinedIcon /> },
    { title: "Geography Chart", to: "/geography-chart", icon: <MapOutlinedIcon /> },
  ];

  return (
    <Drawer
      sx={{
        width: isSidebar ? 250 : 80,
        flexShrink: 0,
        transition: "width 0.5s ease-in-out",
        "& .MuiDrawer-paper": {
          width: isSidebar ? 250 : 80,
          transition: "width 0.5s ease-in-out",
          boxSizing: "border-box",
          zIndex: 1100, // Ensure sidebar stays on top
          overflow: "hidden",
        },
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        boxShadow: "1px 0px 10px 0px rgba(0, 0, 0, 0.2)",
      }}
      variant="persistent"
      anchor="left"
      open={isSidebar || !isSidebar}
    >
      {/* Toggle Icon */}
      <Box
        sx={{
          position: "absolute",
          top: "80px",
          left: isSidebar ? "10px" : "50%", // Align to the left if sidebar is open, center if collapsed
          transform: isSidebar ? "none" : "translateX(-50%)", // No translation when open, center when collapsed
          zIndex: 10,
          justifyContent: "center",
        }}
      >
        <IconButton onClick={() => setIsSidebar(!isSidebar)}>
          <MenuOutlinedIcon />
        </IconButton>
      </Box>

      {/* Menu Items */}
      <List sx={{ marginTop: "108px" }}>
        {menuItems.map((item) => (
          <ListItem
            sx={{justifyContent: 'center', border: 'none', outline: 'none'}}
            button
            key={item.title}
            component={item.onClick ? "button" : Link}
            to={item.to}
            onClick={item.onClick ? item.onClick : undefined}
          >
            <ListItemIcon sx={{
              justifyContent: isSidebar ? "flex-start" : "center"
            }}>{item.icon}</ListItemIcon>
            {isSidebar && <ListItemText primary={item.title} />}
          </ListItem>
        ))}
      </List>

      {/* Charts Section */}
      <Box sx={{ padding: "10px 20px" }}>
        {isSidebar && (
          <Typography variant="subtitle1" color="textSecondary">
            Charts
          </Typography>
        )}
      </Box>
      <List>
        {chartItems.map((item) => (
          <ListItem button key={item.title} sx={{justifyContent: 'center'}} component={Link} to={item.to}>
            <ListItemIcon sx={{ justifyContent: "center" }}>{item.icon}</ListItemIcon>
            {isSidebar && <ListItemText primary={item.title} />}
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
