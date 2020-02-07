import React, { useEffect } from "react";
import AddEmployee from "./components/AddEmployee";
import EmployeeTable from "components/TableEmployee";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddGiftCardRecord from "components/AddGiftCardRecord";
import { db } from "config/firebase";
import { useDispatch } from "react-redux";
import { loadEmployees } from "store/employee";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    db.collection("employee")
      .orderBy("name")
      .get()
      .then(docs => {
        const employee = [];
        docs.forEach(doc => employee.push({ id: doc.id, ...doc.data() }));
        dispatch(loadEmployees(employee));
      });
  }, [dispatch]);
  return (
    <Router>
      <Switch>
        <Route path="/employee">
          <AddEmployee />
          <EmployeeTable />
        </Route>

        <Route path="/">
          <AddGiftCardRecord />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
