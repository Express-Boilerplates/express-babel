import { configureStore } from "@reduxjs/toolkit";
import employeeSlice from "./employee";

const store = configureStore({
  reducer: {
    employees: employeeSlice.reducer
  }
});

export default store;
