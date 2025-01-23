import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { Formik } from "formik";
import { Button, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import InitiateFeedbackService from '../../services/InitiateFeedbackService';

function createData(id, prNum, Det1, Det2, Det3) {
  return {
    id,
    prNum,
    Det1,
    Det2,
    Det3,
  };
}

const rows = [
  createData(1, 'CAP-15-MON-2024', "val x", "val y", "val z"),
  createData(2, 'CAP-21-FRI-2024', "val x", "val y", "val z"),
  createData(3, 'CAP-14-TUE-2025', "val x", "val y", "val z"),
  createData(4, 'CAP-31-THU-2024', "val x", "val y", "val z"),
  createData(5, 'CAP-24-WED-2025', "val x", "val y", "val z")
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
  {
    id: 'machineId',
    numeric: true,
    disablePadding: false,
    label: 'Machine Id',
  },
  {
    id: 'colX',
    numeric: true,
    disablePadding: false,
    label: 'Col X',
  },
  {
    id: 'colY',
    numeric: true,
    disablePadding: false,
    label: 'Col Y',
  },
  {
    id: 'colZ',
    numeric: true,
    disablePadding: false,
    label: 'Col Z',
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            sx={{fontWeight: 'bold', fontSize: '1rem'}}
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;
  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        },
        numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        },
      ]}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h2"
          id="tableTitle"
          component="div"
        >
          PR Machine Form
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const MachineForm = () => {
  const navigate = useNavigate();
  const navigateToPr = (id) => {
    navigate(`/initiate-feedback/${id}`);
  }

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      [...rows]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage],
  );
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
  const handlePRFormSubmit = async (value, { setValues }) => {
    setprLoading(true);

    const data = await InitiateFeedbackService.getPRDetails(value.prnum);
    if (!data) {
      console.error("Data is null or undefined");
      setprLoading(false);
      setY(false);
      return;
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

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const getPRField = [{ name: "prnum", label: "PR Number" }];

    const [prloading, setprLoading] = React.useState(false);


  return (
    <Box sx={{ width: '90%', mx: 'auto', mt: 8 }}>

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
                  onChange   ={(e) => {
                    const uppercasedValue = e.target.value.toUpperCase();
                    e.target.value = uppercasedValue;

                    if (uppercasedValue.length == 15) {
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
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = selected.indexOf(row.id) !== -1;
                const labelId = `enhanced-table-checkbox-${index}`;

                const handleRowClick = (event) => {
                  if (event.target.type !== 'checkbox') {
                    navigateToPr(row.prNum);
                  }
                  else {
                    handleClick(event, row.id);
                  }
                };

                // const handleCheckboxClick = (event) => {
                //   // Prevent the row click event from being triggered when clicking the checkbox
                //   event.stopPropagation();
                // };

                return (
                  <TableRow
                    sx= {{cursor: 'pointer'}}
                    hover
                    onClick={handleRowClick}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        onClick={handleRowClick}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    {/* <TableCell component="th" id={labelId} scope="row" padding="none">
                      {row.id}
                    </TableCell> */}
                    <TableCell align="right">{row.prNum}</TableCell>
                    <TableCell align="right">{row.Det1}</TableCell>
                    <TableCell align="right">{row.Det2}</TableCell>
                    <TableCell align="right">{row.Det3}</TableCell>
                    <TableCell align="right">
                      <button hidden onClick={() => navigateToPr(row.id)}></button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>

          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default MachineForm;
