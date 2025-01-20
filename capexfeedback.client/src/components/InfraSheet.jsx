import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, CircularProgress } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Formik } from "formik";
import ComboBox from '../components/mini-components/ComboBox';
import { Grid } from "@mui/material";
import InfraSheetService from '../services/InfraSheetService';
import MeScreensService from '../services/MeScreensService';

export default function InfraSheet({ buttonAbstract, MeAbstract, mainAbs }) {

  const [IeDetails, setIeDetails] = useState({
    email: "capex@capex.co.in",
    dfmInfiltration: '',
    capacity: '',
    blockAndEquilibrium: '--Block and Equilibrium--'
  });

  const [loading, setLoading] = useState(true); // Loading state to manage fetching data

  useEffect(() => {
    const fetchIeDetails = async () => {
      try {
        const initialIEDetails = await MeScreensService.fetchIeDetails("CAP-15-MON-2024");
        setIeDetails((prevDetails) => ({
          ...prevDetails,
          ...initialIEDetails,
        }));
        setLoading(false); // Data fetched, set loading to false
      } catch (error) {
        console.error("Error fetching IE details:", error);
        setLoading(false); // Stop loading even if there is an error
      }
    };

    fetchIeDetails();
  }, []);

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  const [file, setFile] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleFileUpload = async () => {
    if (!file) {
      alert('Please select a file first.');
      return;
    }

    try {
      const response = await InfraSheetService.uploadInfraSheetFile(file);
      setResponseData('File uploaded successfully!');
      setErrorMessage(null);
    } catch (error) {
      console.error('Error uploading file:', error);
      setErrorMessage(error.message || 'An error occurred during file upload.');
    }
  };

  const handleSubmit = async (values) => {
    try {
      const response = await InfraSheetService.uploadIeDetails(values);
      console.log("Submitted IEDetails", response);
    } catch (error) {
      console.error("Error submitting IE details:", error);
    }
  };

  return (
    <div>
      {errorMessage && (
        <Typography color="error" fontWeight="bold">
          {errorMessage}
          <Box mb={2} />
        </Typography>
      )}
      {responseData && <Typography>{responseData}</Typography>}
      {!(buttonAbstract || MeAbstract || mainAbs) && (
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Infra Sheet Upload</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box display="flex" gap={2} alignItems="center">
              <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
              >
                Upload Infra Sheet
                <VisuallyHiddenInput
                  type="file"
                  onChange={handleFileChange}
                  multiple
                />
              </Button>
              {file && (
                <Typography variant="body2" color="textSecondary">
                  {file.name}
                </Typography>
              )}

              <Button
                color="secondary"
                variant="contained"
                onClick={handleFileUpload}
                disabled={!file}
              >
                Submit
              </Button>
            </Box>
          </AccordionDetails>
        </Accordion>
      )}

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">IE Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Formik
            enableReinitialize={true}
            initialValues={IeDetails}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Box display="flex" flexDirection="column" gap={2}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        size="small"
                        variant="outlined"
                        type="email"
                        value={values.email}
                        InputProps={{
                          readOnly: true,
                          endAdornment: loading ? (
                            <CircularProgress size={20} />
                          ) : null
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        size="small"
                        variant="outlined"
                        type="text"
                        placeholder="DFM Infiltration"
                        value={values.dfmInfiltration}
                        onChange={handleChange}
                        name="dfmInfiltration"
                        disabled={buttonAbstract || loading}
                        InputProps={{
                          endAdornment: loading ? (
                            <CircularProgress size={20} />
                          ) : null
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        size="small"
                        variant="outlined"
                        type="text"
                        placeholder="Capacity"
                        value={values.capacity}
                        onChange={handleChange}
                        name="capacity"
                        disabled={buttonAbstract || loading}
                        InputProps={{
                          endAdornment: loading ? (
                            <CircularProgress size={20} />
                          ) : null
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      {buttonAbstract ? (
                        <TextField
                          size="small"
                          variant="outlined"
                          type="text"
                          placeholder="Block and Equilibrium"
                          value={values.blockAndEquilibrium}
                          onChange={handleChange}
                          name="blockAndEquilibrium"
                          disabled={buttonAbstract || loading}
                          InputProps={{
                            endAdornment: loading ? (
                              <CircularProgress size={20} />
                            ) : null
                          }}
                        />
                      ) : (
                        <ComboBox
                          options={['--Block and Equilibrium--', 'Block x', 'Equilibrium y']}
                          value={values.blockAndEquilibrium}
                          onChange={handleChange}
                          name="blockAndEquilibrium"
                          disabled={loading}
                        />
                      )}
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                      {buttonAbstract || loading ? null : (
                        <Button color="secondary" variant="contained" type="submit">
                          Submit
                        </Button>
                      )}
                    </Grid>
                  </Grid>
                </Box>
              </form>
            )}
          </Formik>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
