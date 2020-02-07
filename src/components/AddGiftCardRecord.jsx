import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import Container from "@material-ui/core/Container";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { db } from "config/firebase";
import { addGiftCard } from "store/giftCard";
import { FormHelperText } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";

const giftCardSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .required(),
  amount: yup
    .number()
    .transform((currentValue, originalValue) =>
      originalValue === "" ? undefined : currentValue
    )
    .typeError("Please enter a valid amount")
    .required("Amount is required"),
  date: yup.date()
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

const AddGiftCardRecord = () => {
  const employees = useSelector(state => state.employees);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [labelWidth, setLabelWidth] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const inputLabel = React.useRef(null);

  const classes = useStyles();
  const { register, handleSubmit, errors, reset, setValue } = useForm({
    validateCriteriaMode: "all",
    validationSchema: giftCardSchema,
    validationSchemaOption: {
      abortEarly: false
    }
  });

  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  });

  const onSubmit = data => {
    // const newGiftCard = await db.collection("giftCard").add(data);
    // dispatch(addGiftCard({ ...data, id: newGiftCard.id }));
    console.log(data);
    setOpen(true);
    reset();
  };
  const handleClose = () => setOpen(false);
  const handleDateChange = date => {
    setSelectedDate(date);
    setValue("date", selectedDate);
  };

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
          Gift Card Added
        </Alert>
      </Snackbar>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={classes.paper}
        method="POST"
      >
        <FormControl variant="outlined" error={errors?.name ? true : false}>
          <InputLabel htmlFor="employee-name" ref={inputLabel}>
            Employee Name
          </InputLabel>
          <Select
            native
            inputRef={register}
            name="name"
            labelWidth={labelWidth}
          >
            <option value=""></option>
            {employees.map(employee => (
              <option key={employee.id} value={employee.id}>
                {employee.name}
              </option>
            ))}
          </Select>
          <FormHelperText> {errors?.name?.message} </FormHelperText>
        </FormControl>

        <TextField
          variant="outlined"
          error={errors?.amount ? true : false}
          helperText={errors?.amount?.message}
          name="amount"
          fullWidth
          id="email"
          label="Amount"
          inputRef={register}
        />

        {/* <TextField
          variant="outlined"
          error={errors?.date ? true : false}
          helperText={errors?.date?.message}
          fullWidth
          name="date"
          label="Date"
          inputRef={register}
        /> */}
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            label="Date"
            value={selectedDate}
            onChange={handleDateChange}
            name="date"
            KeyboardButtonProps={{ "aria-label": "change date" }}
          ></KeyboardDatePicker>
        </MuiPickersUtilsProvider>
        <Fab type="submit" color="primary" variant="extended">
          Add
        </Fab>
      </form>
    </Container>
  );
};

export default AddGiftCardRecord;
