import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import Container from "@material-ui/core/Container";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { addEmployee } from "store/employee";
import { useDispatch } from "react-redux";
import { db } from "config/firebase";

const AddEmployeeSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  phone: yup
    .string()
    .matches(/^[(]?[0-9]{3}[)]?[-\s]?[0-9]{3}[-\s]?[0-9]{4,6}$/, {
      message: "Not a valid phone number",
      excludeEmptyString: true
    }),
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
    "& p": {
      position: "absolute",
      top: "100%"
    },
    paddingBottom: 100,
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
  const { register, handleSubmit, errors, reset } = useForm({
    validateCriteriaMode: "all",
    validationSchema: AddEmployeeSchema,
    validationSchemaOption: {
      abortEarly: false
    }
  });
  const onSubmit = async data => {
    const newEmployee = await db.collection("employee").add(data);
    dispatch(addEmployee({ ...data, id: newEmployee.id }));
    setOpen(true);
    reset();
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
          inputRef={register}
        />

        <TextField
          variant="outlined"
          error={errors?.phone ? true : false}
          helperText={errors?.phone?.message}
          fullWidth
          name="phone"
          label="Phone"
          id="phone"
          inputRef={register}
        />

        <Fab
          type="submit"
          variant="extended"
          color="primary"
          style={{ margin: "10px" }}
        >
          Add
        </Fab>
      </form>
    </Container>
  );
};

export default AddEmployee;
