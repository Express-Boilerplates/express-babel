import React, { useEffect } from "react";
import AddEmployee from "./components/AddEmployee";
import ListEmployee from "./components/ListEmployee";
import EmployeeTable from "components/TableEmployee";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { loadEmployees } from "store/employee";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { data }
      } = await Axios.get("/api/employee");
      dispatch(loadEmployees(data));
    };
    fetchData();
  }, [dispatch]);
  return (
    <>
      <AddEmployee />
      <EmployeeTable />
    </>
  );
};

export default App;
