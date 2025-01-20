import React, { forwardRef, useEffect } from "react";
import { Box, TextField } from "@mui/material";
import { Formik, useFormikContext } from "formik";
import * as yup from "yup";

const AutoTouchFields = ({ fieldValues }) => {
  const { setTouched } = useFormikContext();

  useEffect(() => {
    const touchedFields = fieldValues.reduce((acc, { name }) => {
      acc[name] = true;
      return acc;
    }, {});
    setTouched(touchedFields, true);
  }, [fieldValues, setTouched]);

  return null;
};

const MainForm = forwardRef(({ y, handlePRFormSubmit, fieldValues, isNonMobile }, ref) => {
  // Refine validation schema dynamically based on field names and requirements
  console.log(y)
  const validationSchema = yup.object().shape(
    fieldValues.reduce((acc, { name, label }) => {
      acc[name] = yup
        .string()
        .trim()
        .required(`${label} unable to fetch.`)
        .max(50, `${label} must not exceed 50 characters.`);
      return acc;
    }, {})
  );

  let prValueCapture = {};

  return (
    <Formik
      onSubmit={handlePRFormSubmit}
      validationSchema={validationSchema}
      innerRef={ref}
      initialValues={
        fieldValues.reduce((acc, { name, value }) => {
          acc[name] = value || "";
          if (acc.po !== "") {
            prValueCapture = acc;
          }
          return prValueCapture;
        }, {})
      }
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldTouched,
      }) => (
        <form onSubmit={handleSubmit}>

          {y && <AutoTouchFields fieldValues={fieldValues} />}
          {/* {console.log(prValueCapture)} */}
          <Box
            display="grid"
            gap="20px"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            }}
            sx={{
              "& > div": { gridColumn: "auto" },
            }}
          >

            {fieldValues.map(({ name, label }) => (
              <TextField
                size="small"
                key={name}
                fullWidth
                variant="outlined"
                type="text"
                disabled= {true}
                label={label}
                onBlur={(e) => {
                  handleBlur(e);
                  setFieldTouched(name, true, true);
                }}
                onChange={handleChange}
                value={prValueCapture[name]}
                name={name}
                error={prValueCapture[name] === "" && !!errors[name]}
                helperText={prValueCapture[name] === "" && errors[name]}
                color="primary"
              />
            ))}
          </Box>
        </form>
      )}
    </Formik>
  );
});

export default MainForm;
