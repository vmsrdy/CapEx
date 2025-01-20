import { ColorModeContext, useMode } from "../theme"
import { CssBaseline, ThemeProvider } from "@mui/material"
import Topbar from "./components/views/global/TopBar"
import SideBar from "./components/views/global/SideBar"
import Dashboard from "./components/views/Dashboard"
import InitiateFeedback from "./components/views/InitiateFeedback"
import IeFeedback from "../views/capex-feedback/IeFeedback"
import MeScreens from "../views/capex-feedback/MeScreens"
// import MaintainenceForm from "./components/views/MaintainenceForm"
// import ProjectForm from "./components/views/PrForm"
import { Route, Routes } from "react-router-dom"

function Router() {
  const [theme, colorMode] = useMode()

  return (
    <ColorModeContext.Provider value={colorMode}>

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <SideBar />
          <main>
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/initiate-feedback" element={<InitiateFeedback />} />
              <Route path="/ie-feedback" element={<IeFeedback />} />
              <Route path="/me-screens" element={<MeScreens />} />
              {/* <Route path="/me-screens" element={<MeScreens />} /> */}
              {/* <Route path="/maintainence-form" element={<MaintainenceForm />} /> */}
              {/* <Route path="/project-form" element={<ProjectForm />} /> */}
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default Router
