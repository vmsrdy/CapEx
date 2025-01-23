import React, { useRef, useState, useEffect } from "react";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import PRForm from "../../components/PRForm";
import WorkflowTable from "../../components/WorkflowTable";
import InitiateFeedbackService from "../../services/InitiateFeedbackService";
import { useParams } from 'react-router-dom'

import SendIcon from '@mui/icons-material/Send';

export const prFields = [
  { name: "prnum", label: "PR Number" }
];

export const fieldValuespr = [
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

  const { id } = useParams();

  useEffect(() => {
    const handlePRFormSubmit = async () => {
      const data = await InitiateFeedbackService.getPRDetails(id);
      if (!data) {
        console.error("Data is null or undefined");
        setprLoading(false);
        setY(false);
        return;
      }
      console.log("Data is not null");

      setFieldValues((prev) =>
        prev.map((field) => {
          const updatedValue = data[field.name] || "";
          return { ...field, value: updatedValue };
        })
      );
    };

    handlePRFormSubmit();
  }, [id]);

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

  const isValues = () => {
    const boolField =  fieldValues.every(field => field.value !== "");
    console.log(boolField)
    return boolField;
  };

  const idStyle = isValues() ? { color: '#00D76B' } : { color: 'red' };

  return (
    <Box m="40px">
      <Header
        title=""
        subtitle={
          <>
            Initiate Your Feedback -
            <span style={idStyle}>{id}</span>
          </>
        }
      />

      <PRForm
        y={y}
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
