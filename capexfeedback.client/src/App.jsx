import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "../src/views/global/TopBar";
import Sidebar from "../src/views/global/SideBar";

import InitiateFeedback from "../src/views/capex-feedback/InitiateFeedback";
import IeFeedback from "../src/views/capex-feedback/IeFeedback";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import MeScreens from './views/capex-feedback/MeScreens'
import MaintainenceForm from './views/capex-feedback/MaintainenceForm'
import ProjectForm from './views/capex-feedback/ProjectForm'

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app" style={{ display: 'flex' }}>
          <Sidebar isSidebar={isSidebar} setIsSidebar={setIsSidebar} />
          <main
            className="content"
            style={{
              overflowY: 'auto',
              marginLeft: isSidebar ? '250px' : '80px', // 250px when sidebar is expanded, 80px when collapsed
              paddingTop: '64px',
              width: '100%',
              transition: 'margin-left 0.5s ease-in-out', // Smooth transition
            }}
          >
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/initiate-feedback" element={<InitiateFeedback />} />
              <Route path="/ie-feedback" element={<IeFeedback />} />
              <Route path="/me-screens" element={<MeScreens />} />
              <Route path="/maintenance-form" element={<MaintainenceForm />} />
              <Route path="/project-form" element={<ProjectForm />} />
              {/* Add other routes here */}
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
