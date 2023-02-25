import React, { useEffect, useState } from 'react'
import Grid from "@mui/material/Grid";
import { styled } from '@mui/material/styles';
import Box from "@mui/material/Box";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import { useFormik } from 'formik';
import axios from "axios";
import * as yup from 'yup'
// import Firebase from '../../helpers/Firebase';
import { capitalizeWords } from '../../helpers/TextFormat';
import { useEmployeePageContext } from '../../../pages/EmployeesPage';
import { useSnackbar } from 'notistack'
import { CircularProgress } from '@mui/material';

// const auth = Firebase.auth();
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function AddNewEmployeeModal(props) {
  const { enqueueSnackbar } = useSnackbar();
  const { refetch } = useEmployeePageContext();
  const [loading, setLoading] = React.useState(false);
  const digitsOnly = (value) => /^\d+$/.test(value)
  const employeeRegisterValidationSchema = yup.object().shape({
    fname: yup
      .string()
      .required('First Name is required'),
    lname: yup
      .string()
      .required('Last Name is required'),
    email: yup
      .string()
      .email("Please enter valid email")
      .required('Email is required'),
    purok: yup
      .string()
      .required('Purok is required'),
    street: yup
      .string()
      .required('Street is required'),
    barangay: yup
      .string()
      .required('Barangay is required'),
    town: yup
      .string()
      .required('Town is required'),
    postal_code: yup
      .string()
      .required('Postal Code is required')
      .test('Digits only', 'The field should be digits only', digitsOnly)
      .min(4, `Must be 4 digits`)
      .max(4, `Must be 4 digits`),
    gender: yup
      .string()
      .required('Gender is required'),
    contact: yup
      .string()
      .required('Contact is required')
      .test('Digits only', 'The field should be digits only', digitsOnly)
      .min(11, `Must be 11 digits starting with 09`)
      .max(11, `Must be 11 digits starting with 09`),
  })

  //   const handleFirebase =async (values,resetForm) =>{
  //     await auth.createUserWithEmailAndPassword(values.email, "p@ssw0rd")
  //     .then(function() {
  //         auth.currentUser.sendEmailVerification();
  //     })
  //     .catch(function(error) {
  //         // setError(error.message);
  //         enqueueSnackbar(error.message, { variant:'error' });
  //     });
  //   }
  const handleFormSubmit = async (values, { resetForm }) => {
    setLoading(true);
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin/employees/add`, {
      email: values.email,
      contact: values.contact,
      fname: capitalizeWords(values.fname),
      lname: capitalizeWords(values.lname),
      purok: capitalizeWords(values.purok),
      street: capitalizeWords(values.street),
      barangay: capitalizeWords(values.barangay),
      town: capitalizeWords(values.town),
      postal_code: values.postal_code,
      gender: values.gender,
    })
      .then(res => {
        setLoading(false);
        if (res.data.success) {
          // handleFirebase(values,resetForm);
          refetch();
          enqueueSnackbar(res.data.message, { variant: 'success' });
        } else {
          enqueueSnackbar(res.data.message, { variant: 'error' });
        }
      })
  }
  const { handleChange, handleSubmit, handleBlur, values, errors, isValid, touched, setErrors } = useFormik({
    initialValues: { fname: '', lname: '', email: '', contact: '', purok: '', street: '', barangay: '', town: '', postal_code: '', gender: ''},
    enableReinitialize: true,
    initialErrors : false,
    validationSchema: employeeRegisterValidationSchema,
    onSubmit: handleFormSubmit
  });

  useEffect( ()=>{
   setErrors({});
  },[!props.openModal])
  
  return (
    <BootstrapDialog
      onClose={() => props.setOpenModal(false)}
      aria-labelledby="customized-dialog-title"
      open={props.openModal}
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={() => props.setOpenModal(false)}>
        Add Employee Record
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <Box sx={{ width: '100%' }}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={6}>
              <TextField
                value={values.fname}
                onChange={handleChange('fname')}
                onBlur={handleBlur('fname')}
                margin="dense"
                label="First Name"
                type="text"
                inputProps={{ style: { textTransform: "capitalize" } }}
                fullWidth
              />
              {(errors.fname && touched.fname) &&
                <p className="text-danger small ">{errors.fname}</p>
              }
            </Grid>
            <Grid item xs={6}>
              <TextField
                value={values.lname}
                onChange={handleChange('lname')}
                onBlur={handleBlur('lname')}
                inputProps={{ style: { textTransform: "capitalize" } }}
                margin="dense"
                label="Last Name"
                type="text"
                fullWidth
              />
              {(errors.lname && touched.lname) &&
                <p className="text-danger small ">{errors.lname}</p>
              }
            </Grid>
          </Grid>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={4}>
              <TextField
                value={values.purok}
                onChange={handleChange('purok')}
                onBlur={handleBlur('purok')}
                inputProps={{ style: { textTransform: "capitalize" } }}
                margin="dense"
                label="Purok"
                type="text"
                fullWidth
              />
              {(errors.purok && touched.purok) &&
                <p className="text-danger small ">{errors.purok}</p>
              }
            </Grid>
            <Grid item xs={8}>
              <TextField
                value={values.street}
                onChange={handleChange('street')}
                onBlur={handleBlur('street')}
                inputProps={{ style: { textTransform: "capitalize" } }}
                margin="dense"
                label="Street"
                type="text"
                fullWidth
              />
              {(errors.street && touched.street) &&
                <p className="text-danger small ">{errors.street}</p>
              }
            </Grid>
            <Grid item xs={4}>
              <TextField
                value={values.barangay}
                onChange={handleChange('barangay')}
                onBlur={handleBlur('barangay')}
                inputProps={{ style: { textTransform: "capitalize" } }}
                margin="dense"
                label="Barangay"
                type="text"
                fullWidth
              />
              {(errors.barangay && touched.barangay) &&
                <p className="text-danger small ">{errors.barangay}</p>
              }
            </Grid>
            <Grid item xs={4}>
              <TextField
                value={values.town}
                onChange={handleChange('town')}
                onBlur={handleBlur('town')}
                inputProps={{ style: { textTransform: "capitalize" } }}
                margin="dense"
                label="Town"
                type="text"
                fullWidth
              />
              {(errors.town && touched.town) &&
                <p className="text-danger small ">{errors.town}</p>
              }
            </Grid>
            <Grid item xs={4}>
              <TextField
                value={values.postal_code}
                onChange={handleChange('postal_code')}
                onBlur={handleBlur('postal_code')}
                inputProps={{ style: { textTransform: "capitalize" } }}
                margin="dense"
                label="Postal Code"
                type="text"
                fullWidth
              />
              {(errors.postal_code && touched.postal_code) &&
                <p className="text-danger small ">{errors.postal_code}</p>
              }
            </Grid>

          </Grid>
          <TextField
            value={values.email}
            onChange={handleChange('email')}
            onBlur={handleBlur('email')}
            inputProps={{ style: { textTransform: "lowercase" } }}
            margin="dense"
            label="Email Address"
            type="email"
            fullWidth
          />
          {(errors.email && touched.email) &&
            <p className="text-danger small ">{errors.email}</p>
          }
          <TextField
            value={values.contact}
            onChange={handleChange('contact')}
            onBlur={handleBlur('contact')}
            margin="dense"
            label="Contact Number"
            type="text"
            fullWidth
          />
          {(errors.contact && touched.contact) &&
            <p className="text-danger small ">{errors.contact}</p>
          }
          <Grid container rowSpacing={1} mt={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={6}>
              <FormControl sx={{ width: '100%' }}>
                <InputLabel htmlFor="gender">Gender</InputLabel>
                <Select
                  value={values.gender}
                  onChange={handleChange('gender')}
                  onBlur={handleBlur('gender')}
                  label="Gender"
                  inputProps={{
                    name: 'gender',
                    id: 'gender',
                  }}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </Select>
              </FormControl>
              {(errors.gender && touched.gender) &&
                <p className="text-danger small">{errors.gender}</p>
              }
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <button type="submit" className='btn btn-success' disabled={!isValid || loading} onClick={handleSubmit}>
          {loading ? <><CircularProgress size={20} /> Adding...</> : "Add Employee"}
        </button>
      </DialogActions>
    </BootstrapDialog>
  );
}