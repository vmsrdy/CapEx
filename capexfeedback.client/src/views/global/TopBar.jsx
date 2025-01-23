import { Box, IconButton, useTheme, Typography } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme"
import TataLogo from '../../assets/TataLogo.png'
// import { ColorModeContext, tokens} from "../../theme"
// import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
// import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
// import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
// import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
// import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  return (
    <Box
      sx={{
        boxShadow: '0 2px 6px 0px rgba(0, 0, 0, 0.2)',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        backgroundColor: colors.primary[700],
        // display: 'flex', // Add this to the outer Box
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 2,
      }}
    >
      {/* LOGO */}
      <Box
        sx={{
          display: 'flex', // Ensures logo and text are in a row
          alignItems: 'center',
        }}
      >
        <img alt="T" src={TataLogo} style={{ width: '50px' }} />
        <Typography
          variant="h2"
          sx={{ marginLeft: 2, color: '#ffffff', fontWeight: 'bold' }}
        >
          CFS CapEx Feedback System
        </Typography>
      </Box>
    </Box>

  );
};

export default Topbar;
