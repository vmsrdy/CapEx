import React, { forwardRef, useEffect, useState } from "react";
import { Box, TextField, CircularProgress } from "@mui/material";
import { Formik, useFormikContext } from "formik";
import * as yup from "yup";

const AutoTouchFields = ({ fieldValues, setLoading }) => {
  const { setTouched } = useFormikContext();

  useEffect(() => {
    const touchedFields = fieldValues.reduce((acc, { name }) => {
      acc[name] = true;
      return acc;
    }, {});
      const setTimer = setTimeout(() => {
          setTouched(touchedFields, true);
          setLoading(false);
      }, 3000)
  }, [fieldValues, setTouched]);

  return null;
};

const MainForm = forwardRef(({ y, handlePRFormSubmit, fieldValues, isNonMobile }, ref) => {
  const [loading, setLoading] = useState(true);

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

  // const [prVals, setprVals]= useState();
  let prValueCapture = {};

  return (
    <Formik
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

                  {!y && <AutoTouchFields fieldValues={fieldValues} setLoading={setLoading} />}
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
                label={label}
                onBlur={(e) => {
                  handleBlur(e);
                  setFieldTouched(name, true, true);
                }}
                // onChange={handleChange}
                value={prValueCapture[name]}
                name={name}
                error={prValueCapture[name] === "" && !!errors[name]}
                helperText={prValueCapture[name] === "" && errors[name]}
                color="primary"
                InputProps={{
                  endAdornment: loading && <CircularProgress size={20} />,
                }}
              />
            ))}
          </Box>
        </form>
      )}
    </Formik>
  );
});

export default MainForm;
