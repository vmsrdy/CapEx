import React, { useEffect, useState } from 'react';
import MeScreens from "./MeScreens.jsx";
import { Box, Button, AccordionActions } from "@mui/material";
import MaintainenceFormService from '../../services/MaintainenceFormService.js';

const MaintainenceForm = ({ mainAbs }) => {
  const MeAbstract = true;
  const [IEDetailsPreFill, setIEDetailsPreFill] = useState(null);

  // Fetch IEDetails on mounting
  useEffect(() => {
    const fetchData = async () => {
      const data = await MaintainenceFormService.fetchIEDetails();
      setIEDetailsPreFill(data);
    };

    fetchData();
  }, []);

  const maintainenceFormSubmit = async (event) => {
    try {
      const action = event.target.textContent;
      const status = action === 'Approve' ? 'Accepted' : 'Rejected';
      console.log(status);

      const result = await MaintainenceFormService.submitMaintenanceFormStatus(status);
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
      <MeScreens
        mainAbs={mainAbs} // Default: undefined
        MeAbstract={MeAbstract} // Default: true
        IEDetailsPreFill={IEDetailsPreFill}
      />
      {!mainAbs && (
        <AccordionActions sx={{ pr: 5, pt: 2 }} justifyContent="center" display="flex">
          <Button variant='contained' color='success' onClick={maintainenceFormSubmit}>Approve</Button>
          <Button variant='contained' color='error' onClick={maintainenceFormSubmit}>Reject</Button>
        </AccordionActions>
      )}
    </div>
  );
};

export default MaintainenceForm;
