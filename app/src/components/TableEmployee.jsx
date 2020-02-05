import React, { useState } from "react";
import MaterialTable from "material-table";
import { useSelector, useDispatch } from "react-redux";
import { deleteEmployee } from "store/employee";

const EmployeeTable = () => {
  const employees = useSelector(state => state.employees);
  const dispatch = useDispatch();
  const editable = employees.map(o => ({ ...o }));
  const [columns] = useState([
    { title: "Name", field: "name" },
    { title: "Email", field: "email", render: rowData => rowData.email ?? "-" },
    {
      title: "Phone",
      field: "phoneNumber",
      render: rowData => rowData.phoneNumber ?? "-"
    }
  ]);

  return (
    <MaterialTable
      title="Employees"
      columns={columns}
      data={editable}
      editable={{
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              dispatch(deleteEmployee(oldData));
            }, 1);
          })
      }}
    />
  );
};

export default EmployeeTable;
