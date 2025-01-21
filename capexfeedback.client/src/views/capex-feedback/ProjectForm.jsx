import React from 'react';
import { Box, Button, Card, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, TextField, Stack } from "@mui/material";
import AccordionActions from '@mui/material/AccordionActions';
import { styled, alpha } from '@mui/material/styles';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem, treeItemClasses } from '@mui/x-tree-view/TreeItem';
import { useTreeViewApiRef } from '@mui/x-tree-view/hooks/useTreeViewApiRef';
import { submitProjectFormStatus } from '../../services/ProjectFormServices.js';
import MaintainenceForm from "./MaintainenceForm.jsx";

const CustomTreeItem = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.grey[200],
  [`& .${treeItemClasses.content}`]: {
    borderRadius: theme.spacing(0.5),
    padding: theme.spacing(0.5, 1),
    margin: theme.spacing(0.2, 0),
    [`& .${treeItemClasses.label}`]: {
      fontSize: '0.8rem',
      fontWeight: 500,
    },
  },
  [`& .${treeItemClasses.iconContainer}`]: {
    borderRadius: '50%',
    backgroundColor: theme.palette.primary.dark,
    padding: theme.spacing(0, 1.2),
    ...theme.applyStyles('light', {
      backgroundColor: alpha(theme.palette.primary.main, 0.25),
    }),
    ...theme.applyStyles('dark', {
      color: theme.palette.primary.contrastText,
    }),
  },
  [`& .${treeItemClasses.groupTransition}`]: {
    marginLeft: 15,
    paddingLeft: 18,
    borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
  },
  ...theme.applyStyles('light', {
    color: theme.palette.grey[800],
  }),
}));

const ProjectForm = () => {
  const apiRef = useTreeViewApiRef();
  const mainAbs = true;

  const [formData, setFormData] = React.useState({
    infrastructure: '',
    infrastructurePoNumber: '',
    utilities: '',
    utilitiesPoNumber: '',
    remarks: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSelectGridPro = (event) => {
    apiRef.current?.selectItem({
      event,
      itemId: 'grid-pro',
      keepExistingSelection: true,
    });
  };

  const projectFormSubmit = async (status) => {
    try {
      const { infrastructure, infrastructurePoNumber, utilities, utilitiesPoNumber, remarks } = formData;

      if (!infrastructure || !utilities || !remarks) {
        console.error("Some required fields are missing!");
        return;
      }

      const action = status === 'Accepted' ? 'Approve' : 'Reject';

      const data = {
        infrastructure,
        infrastructurePoNumber,
        utilities,
        utilitiesPoNumber,
        remarks,
        status,
        action
      };

      console.log("Submitting form data:", data);

      const result = await submitProjectFormStatus(data);
      if (result) {
        console.log(`Status successfully updated to: ${status}`);
      } else {
        console.error('Failed to update status.');
      }
    } catch (error) {
      console.error('Error in submit action:', error);
    }
  };

  return (
    <div>
      <MaintainenceForm mainAbs={mainAbs} /> {/* Default: true */}
      <Card sx={{ mt: -3, ml: 5, mr: 5 }}>
        <Stack spacing={2}>
          <div>
            <Button onClick={handleSelectGridPro}>Select grid pro item</Button>
          </div>

          <Box sx={{ minHeight: 352, minWidth: 250 }}>
            <SimpleTreeView
              apiRef={apiRef}
              defaultExpandedItems={['infrastructure', 'utilities', 'remarks']}
              multiSelect
              defaultSelectedItems={['infrastructure']}
            >
              <CustomTreeItem itemId="infrastructure" label="Infrastructure">
                <Card sx={{ ml: 5, mr: 5, padding: 2, marginTop: 3, marginBottom: 3, boxShadow: 3 }}>
                  <FormControl>
                    <FormLabel id="infrastructure-radio-label">Infrastructure</FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="infrastructure-radio-label"
                      name="infrastructure"
                      value={formData.infrastructure}
                      onChange={handleInputChange}
                    >
                      <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                      <FormControlLabel value="No" control={<Radio />} label="No" />
                    </RadioGroup>
                  </FormControl>
                </Card>

                <TextField
                  sx={{ ml: 5, mr: 5, display: 'flex', justifyContent: "center" }}
                  size="small"
                  variant="outlined"
                  placeholder="PO Number"
                  name="infrastructurePoNumber"
                  value={formData.infrastructurePoNumber}
                  onChange={handleInputChange}
                />

                <Box sx={{ mb: 2 }} />
              </CustomTreeItem>

              <CustomTreeItem itemId="utilities" label="Utilities">
                <Card sx={{ ml: 5, mr: 5, padding: 2, marginTop: 3, marginBottom: 3, boxShadow: 3 }}>
                  <FormControl>
                    <FormLabel id="utilities-radio-label">Utilities</FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="utilities-radio-label"
                      name="utilities"
                      value={formData.utilities}
                      onChange={handleInputChange}
                    >
                      <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                      <FormControlLabel value="No" control={<Radio />} label="No" />
                    </RadioGroup>
                  </FormControl>
                </Card>

                <TextField
                  sx={{ ml: 5, mr: 5, display: 'flex', justifyContent: "center" }}
                  size="small"
                  variant="outlined"
                  placeholder="PO Number"
                  name="utilitiesPoNumber"
                  value={formData.utilitiesPoNumber}
                  onChange={handleInputChange}
                />
                <Box sx={{ mb: 2 }} />
              </CustomTreeItem>

              <CustomTreeItem itemId="remarks" label="Remarks">
                <Card sx={{ ml: 5, mr: 5, padding: 2, marginTop: 3, marginBottom: 3, boxShadow: 3 }}>
                  <TextField
                    size="small"
                    fullWidth
                    variant="outlined"
                    placeholder="Enter your remarks"
                    name="remarks"
                    value={formData.remarks}
                    onChange={handleInputChange}
                    multiline
                    rows={4}
                  />
                </Card>
              </CustomTreeItem>
            </SimpleTreeView>
          </Box>
        </Stack>
      </Card>
      <AccordionActions sx={{ pr: 5, pt: 2 }} justifyContent="center" display="flex">
        <Button variant='contained' color='success' onClick={() => projectFormSubmit('Accepted')}>Approve</Button>
        <Button variant='contained' color='error' onClick={() => projectFormSubmit('Rejected')}>Reject</Button>
      </AccordionActions>
    </div>
  );
};

export default ProjectForm;
