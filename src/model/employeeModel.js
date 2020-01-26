import mongoose from "mongoose";
import validator from "validator";

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, `Name is required`],
    trim: true
  },
  email: {
    type: String,
    trim: true,
    validate: [validator.isEmail, `is not a valid email address`]
  },
  phoneNumber: {
    type: Number
  }
});

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;
