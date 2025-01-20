import React, { useRef, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import PRForm from "../../components/PRForm";
import WorkflowTable from "../../components/WorkflowTable";
import InitiateFeedbackService from "../../services/InitiateFeedbackService";

import SendIcon from '@mui/icons-material/Send';

// Define prFields at the top level before export to avoid the "import/export" error
export const prFields = [
  { name: "prnum", label: "PR Number" }
];

export const fieldValuespr=[
  { value: "", name: "purchReq", label: "Purch.Req." },
  { value: "", name: "requisnr", label: "Requisnr." },
  { value: "", name: "item", label: "Item" },
  { value: "", name: "material", label: "Material" },
  { value: "", name: "shortText", label: "Short Text" },
  { value: "", name: "po", label: "PO" },
  { value: "", name: "pgr", label: "PGr" },
  { value: "", name: "matlGroup", label: "Matl Group" },
  { value: "", name: "delivDate", label: "Deliv.Date" },
  { value: "", name: "issStLoc", label: "Iss.StLoc." },
  { value: "", name: "d", label: "D" },
  { value: "", name: "sLoc", label: "SLoc" },
  { value: "", name: "supplier", label: "Supplier" },
  { value: "", name: "s", label: "S" },
  { value: "", name: "cl", label: "Cl." },
  { value: "", name: "totalValue", label: "Total Value" },
  { value: "", name: "reqDate", label: "Req. Date" },
  { value: "", name: "releaseDt", label: "Release Dt" },
  { value: "", name: "chngdOn", label: "Chngd On" },
  { value: "", name: "quantity", label: "Quantity" },
  { value: "", name: "poDate", label: "PO Date" },
  { value: "", name: "ordered", label: "Ordered" },
  { value: "", name: "un", label: "Un" },
  { value: "", name: "shortage", label: "Shortage" },
  { value: "", name: "per", label: "Per" },
  { value: "", name: "crcy", label: "Crcy" },
  { value: "", name: "valnPrice", label: "Valn Price" }
]

const InitiateFeedback = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const prFormRef = useRef();

  const [prloading, setprLoading] = React.useState(false);

  const [fieldValues, setFieldValues] = useState([
    { value: "", name: "purchReq", label: "Purch.Req." },
    { value: "", name: "requisnr", label: "Requisnr." },
    { value: "", name: "item", label: "Item" },
    { value: "", name: "material", label: "Material" },
    { value: "", name: "shortText", label: "Short Text" },
    { value: "", name: "po", label: "PO" },
    { value: "", name: "pgr", label: "PGr" },
    { value: "", name: "matlGroup", label: "Matl Group" },
    { value: "", name: "delivDate", label: "Deliv.Date" },
    { value: "", name: "issStLoc", label: "Iss.StLoc." },
    { value: "", name: "d", label: "D" },
    { value: "", name: "sLoc", label: "SLoc" },
    { value: "", name: "supplier", label: "Supplier" },
    { value: "", name: "s", label: "S" },
    { value: "", name: "cl", label: "Cl." },
    { value: "", name: "totalValue", label: "Total Value" },
    { value: "", name: "reqDate", label: "Req. Date" },
    { value: "", name: "releaseDt", label: "Release Dt" },
    { value: "", name: "chngdOn", label: "Chngd On" },
    { value: "", name: "quantity", label: "Quantity" },
    { value: "", name: "poDate", label: "PO Date" },
    { value: "", name: "ordered", label: "Ordered" },
    { value: "", name: "un", label: "Un" },
    { value: "", name: "shortage", label: "Shortage" },
    { value: "", name: "per", label: "Per" },
    { value: "", name: "crcy", label: "Crcy" },
    { value: "", name: "valnPrice", label: "Valn Price" }
  ]);

  const getPRField = [{ name: "prnum", label: "PR Number" }];
  const initialSmallFormValues = getPRField.reduce((acc, { name }) => {
    acc[name] = "";
    return acc;
  }, {});

  const checkoutSchema = yup.object().shape(
    fieldValues.reduce((acc, { name }) => {
      acc[name] = yup.string().required(`${name} unable to fetch!`);
      return acc;
    }, {})
  );

  const handleMainFormSubmit = async (value) => {
    console.log("Main form submitted", value);
  };

  const [y, setY] = useState(false);

  const handlePRFormSubmit = async (value, { setValues }) => {
    setprLoading(true);

    const data = await InitiateFeedbackService.getPRDetails(value.prnum);
    if (!data) {
      console.error("Data is null or undefined");
      setprLoading(false);
      setY(false);
      return; // Early exit to prevent further errors
    }
    setY(true);
    console.log("Data is not null");
    setprLoading(false);

    setFieldValues((prev) =>
      prev.map((field) => {
        const updatedValue = data[field.name] || "";
        return { ...field, value: updatedValue };
      })
    );

    setValues((prevValues) => ({
      ...prevValues,
      ...data,
    }));
  };

  const handleInitiateFeedback = async () => {
    let prFormValid = true;

    for (const field of fieldValues) {
      if (!field.value) {
        prFormValid = false;
        break;
      }
    }

    const result = await InitiateFeedbackService.postFeedbackData(prFormValid);
    console.log(result);
  };

  return (
    <Box m="40px">
      <Header title="PR Details Form" subtitle="Initiate Your Feedback" />

      <Formik
        onSubmit={handlePRFormSubmit}
        initialValues={fieldValues.reduce((acc, { name, value }) => {
          acc[name] = value;
          return acc;
        }, {})}
      >
        {({
          values,
          handleBlur,
          handleChange,
          handleSubmit,
          touched,
          errors,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              mb="20px"
              display="grid"
              gap="20px"
              gridTemplateColumns="repeat(2, 1fr)"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 2" },
              }}
            >
              {getPRField.map(({ name, label }) => (
                <TextField
                  size="small"
                  key={name}
                  fullWidth
                  variant="outlined"
                  type="text"
                  label={label}
                  onBlur={handleBlur}
                  value={values[name]}
                  name={name}
                  error={!!touched[name] && !!errors[name]}
                  helperText={touched[name] && errors[name]}
                  inputProps={{ maxLength: 15 }}
                  onChange={(e) => {
                    const uppercasedValue = e.target.value.toUpperCase();
                    e.target.value = uppercasedValue;

                    if (uppercasedValue.length === 15) {
                      e.target.style.color = "green";
                      e.target.style.backgroundColor = "#F3F7F1";
                    } else {
                      e.target.style.color = "";
                      e.target.style.backgroundColor = "";
                    }

                    handleChange(e);
                  }}
                />
              ))}
              <Button
                sx={{ color: 'white' }}
                type="submit"
                color="secondary"
                loading={prloading}
                loadingPosition="end"
                variant="contained"
              >
                GET PR DETAILS
              </Button>
            </Box>
          </form>
        )}
      </Formik>

      <PRForm
        y={y}
        handlePRFormSubmit={handlePRFormSubmit}
        fieldValues={fieldValues}
        handleMainFormSubmit={handleMainFormSubmit}
        validationSchema={checkoutSchema}
      />

      <WorkflowTable />

      <Box mt="20px" display="flex" justifyContent="end">
        <Button
          onClick={handleInitiateFeedback}
          color="secondary"
          variant="contained"
        >
          Initiate Feedback
        </Button>
      </Box>
    </Box>
  );
};

export default InitiateFeedback;
