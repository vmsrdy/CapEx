import React from 'react';
import IeFeedBack from './IeFeedback';
import { Box, Button, AccordionActions } from "@mui/material";
// import { submitMeScreenFormStatus } from '../services/MeScreensService';

const MeScreens = ({ MeAbstract, mainAbs }) => {
  const submitButton = true;

  const handleMeScreenFormStatus = async (event) => {
    try {
      const action = event.target.textContent;
      const status = action === 'Approve' ? 'Accepted' : 'Rejected';

      const result = await submitMeScreenFormStatus(status);
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
      <IeFeedBack
        mainAbs={mainAbs} // Default: undefined
        MeAbstract={MeAbstract} // Default: undefined
        buttonAbstract={submitButton} // Default: true
      ></IeFeedBack>
      {(!mainAbs && !MeAbstract) && (
        <AccordionActions sx={{ pr: 5, pt: 2 }} justifyContent="center" display="flex">
          <Button variant='contained' color='success' onClick={handleMeScreenFormStatus}>Approve</Button>
          <Button variant='contained' color='error' onClick={handleMeScreenFormStatus}>Reject</Button>
        </AccordionActions>
      )}
    </div>
  );
};

export default MeScreens;
