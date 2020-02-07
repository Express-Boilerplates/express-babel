import { createSlice } from "@reduxjs/toolkit";

const employeeSlice = createSlice({
  name: "employee",
  initialState: [],
  reducers: {
    addEmployee: (state, { payload }) => {
      state.push(payload);
    },
    loadEmployees: (state, { payload }) => (state = payload),
    deleteEmployee: (state, { payload }) => {
      state.splice(
        state.findIndex(emp => emp.id === payload.id),
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
