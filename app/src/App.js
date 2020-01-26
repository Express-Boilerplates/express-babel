import React, { useState, useEffect } from "react";
import Axios from "axios";
import Select from "react-select";
import Grid from "@material-ui/core/Grid";
import AddEmployee from "./components/AddEmployee";
import ListEmployee from "./components/ListEmployee";

const App = () => {
  const [employee, setEmployee] = useState([]);
  const [inputValue, setInputValue] = useState({});

  const today = new Date();
  const lastWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 7
  );

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { data }
      } = await Axios.get("http://localhost:4343/api/employee");
      // const employees = data?.map(emp => {
      //   return { ...emp};
      // });
      setEmployee(data);
    };
    fetchData();
  }, []);
  return (
    // <Grid container justify="center" alignItems="center">
    //   <Grid item xs={12}>
    //     <form action="">
    //       <Select options={employee} onChange={e => setInputValue(e)} />
    //     </form>
    //   </Grid>
    // </Grid>
    <>
      <AddEmployee />
      <ListEmployee employees={employee}></ListEmployee>
    </>
  );
};

export default App;
