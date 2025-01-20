import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import Header from "../components/Header";

const WorkflowTable = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const rows = [
    { id: 1, level: "L1 - Information Generation", dept1: "IE", dept2: "-", dept3: "-" },
    { id: 2, level: "L2 - Validation", dept1: "ME", dept2: "Maintenance", dept3: "-" },
    { id: 3, level: "L3 - Gap and Supporting POs", dept1: "Projects", dept2: "Safety", dept3: "IT" },
    { id: 4, level: "L4 - Consolidation", dept1: "PMO", dept2: "SCM", dept3: "-" },
  ];

  const columns = [
    { field: "level", headerName: "Levels", flex: 2 },
    { field: "dept1", headerName: "Department - 1", flex: 1 },
    { field: "dept2", headerName: "Department - 2", flex: 1 },
    { field: "dept3", headerName: "Department - 3", flex: 1 },
  ];

  return (
    <Box m="20px">
      <Header title="WORKFLOW TABLE" subtitle="Mapping Workflow Levels to Departments" />
      <Box
        m="40px 0 0 0"
        height="400px"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
            textAlign: "center",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
            textAlign: "center",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
        }}
      >
        <DataGrid
            rows={rows}
            columns={columns}
            // pagination={false}
            disableSelectionOnClick />
      </Box>
    </Box>
  );
};

export default WorkflowTable;
