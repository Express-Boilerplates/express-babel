import { createSlice } from "@reduxjs/toolkit";
import Axios from "axios";

const employeeSlice = createSlice({
  name: "employee",
  initialState: [],
  reducers: {
    addEmployee: (state, { payload }) => {
      state.push(payload);
    },
    loadEmployees: (state, { payload }) => (state = payload),
    deleteEmployee: (state, { payload }) => {
      Axios.delete(`/api/employee/${payload._id}`);
      state.splice(
        state.findIndex(emp => emp._id === payload._id),
        1
      );
    }
  }
});

export const {
  addEmployee,
  loadEmployees,
  deleteEmployee
} = employeeSlice.actions;

export default employeeSlice;
