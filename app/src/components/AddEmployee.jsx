import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import Container from "@material-ui/core/Container";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import Axios from "axios";
import * as yup from "yup";

import { addEmployee } from "store/employee";
import { useDispatch } from "react-redux";

const AddEmployeeSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  phoneNumber: yup
    .number("please enter a valid phone number")
    .transform((currentValue, originalValue) =>
      originalValue === "" ? undefined : currentValue
    )
    .typeError("Please enter a valid phone number"),
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required")
});

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1),
      width: 200
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      "& > *": {
        margin: theme.spacing(1),
        width: 300
      }
    },
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: 200
      }
    }
  }
}));

const AddEmployee = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm({
    validateCriteriaMode: "all",
    validationSchema: AddEmployeeSchema,
    validationSchemaOption: {
      abortEarly: false
    }
  });
  const onSubmit = async data => {
    try {
      const employee = await Axios.post("/api/employee", {
        ...data
      });
      dispatch(addEmployee({ ...employee.data.employee }));
      setOpen(true);
    } catch (error) {
      console.log(error);
    }
  };
  const handleClose = () => setOpen(false);
  return (
    <Container component="main" maxWidth="md">
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          variant="filled"
          elevation={6}
          severity="success"
        >
          Employee Added
        </Alert>
      </Snackbar>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={classes.paper}
        method="POST"
      >
        <TextField
          error={errors?.name ? true : false}
          helperText={errors?.name?.message}
          name="name"
          variant="outlined"
          fullWidth
          id="name"
          label="Full Name"
          autoFocus
          inputRef={register}
        />

        <TextField
          variant="outlined"
          error={errors?.email ? true : false}
          helperText={errors?.email?.message}
          name="email"
          fullWidth
          id="email"
          label="Email Address"
          //   autoComplete="email"
          inputRef={register}
        />

        <TextField
          variant="outlined"
          error={errors?.phoneNumber ? true : false}
          helperText={errors?.phoneNumber?.message}
          fullWidth
          name="phoneNumber"
          label="phoneNumber"
          id="phoneNumber"
          type="tel"
          inputRef={register}
        />

        <Fab
          type="submit"
          variant="extended"
          color="primary"
          style={{ margin: "10px" }}
        >
          Add User
        </Fab>
      </form>
    </Container>
  );
};

export default AddEmployee;
