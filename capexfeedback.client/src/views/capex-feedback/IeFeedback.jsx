import * as React from 'react';
import { Box } from "@mui/material";
import { useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import Header from "../../components/Header.jsx";
import PRForm from "../../components/PRForm.jsx";
import InfraSheet from '../../components/InfraSheet';
import { useMediaQuery } from "@mui/material";
import * as yup from "yup";
import { fieldValuespr } from "../capex-feedback/InitiateFeedback.jsx";
import InitiateFeedbackService from '../../services/InitiateFeedbackService.js';

const fields = fieldValuespr;
const checkoutSchema = yup.object().shape({
  ...fields.reduce((acc, { name }) => {
    acc[name] = yup.string().required("Unable to fetch");
    return acc;
  }, {}),
});

export default function IeFeedback({ buttonAbstract, MeAbstract, mainAbs }) {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [initialValues, setInitialValues] = React.useState({});

  useEffect(() => {
    const fetchPrValues = async () => {
      const response = await InitiateFeedbackService.getPRDetails('CAP-15-MON-2024');

      setInitialValues(response);

      const updatedFieldValues = fieldValuespr.map((field) => ({
        ...field,
        value: response[field.name] || field.value,
      }));

      fieldValuespr.splice(0, fieldValuespr.length, ...updatedFieldValues);

      console.log("This is the response:", response);
      console.log("Updated field values:", updatedFieldValues);
    };

    fetchPrValues();
  }, []);

  let isMeScreens = false;
  let isMaintainceForm = false;
  let isProjectForm = false;

  console.log(mainAbs, MeAbstract, buttonAbstract);

  const handleMainFormSubmit = async (values) => {
    console.log("Main form submitted", values);
    alert("Form Submitted");
  };

  if (mainAbs === undefined && MeAbstract === true && buttonAbstract === true) {
    isMaintainceForm = true;
    console.log(isMaintainceForm);
  }
  if (mainAbs === true && MeAbstract === true && buttonAbstract === true) {
    isProjectForm = true;
    console.log(isProjectForm);
  }
  if (mainAbs === undefined && MeAbstract === undefined && buttonAbstract === true) {
    isMeScreens = true;
    console.log(isMeScreens);
  }


  return (
    <Box m="40px">
      <div>
        {isMaintainceForm ? (
          <Header title="Maintainance Form" subtitle="" />
        ) : isProjectForm ? (
          <Header title="Project Form" subtitle="" />
        ) : isMeScreens ? (
          <Header title="ME Screens" subtitle='' />
        ) : (
          <Header title="IE Feedback" subtitle="" />
        )}

        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Header title="PR Details" subtitle="" />
          </AccordionSummary>
          <AccordionDetails>
            <PRForm
              // initialValues={initialValues}
              // validationSchema={checkoutSchema}
              fieldValues={fieldValuespr}
              handleMainFormSubmit={handleMainFormSubmit}
              isNonMobile={isNonMobile}
            />
          </AccordionDetails>
        </Accordion>

        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Header title="Infra Sheet Download" subtitle="" />
          </AccordionSummary>
          <AccordionDetails>
            <InfraSheet
              buttonAbstract={buttonAbstract}
              MeAbstract={MeAbstract}
              mainAbs={mainAbs}
            />
          </AccordionDetails>
        </Accordion>

      </div>
    </Box>
  );
}