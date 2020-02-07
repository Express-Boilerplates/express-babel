import React, { useState } from "react";
import MaterialTable from "material-table";
import { useSelector, useDispatch } from "react-redux";
import { deleteEmployee } from "store/employee";
import { db } from "config/firebase";
import { PhoneNumberFormat, PhoneNumberUtil } from "google-libphonenumber";

const parseNumber = rowNumber => {
  const phoneUtils = PhoneNumberUtil.getInstance();
  const number = phoneUtils.parseAndKeepRawInput(rowNumber, "US");
  return phoneUtils.format(number, PhoneNumberFormat.NATIONAL);
};

const EmployeeTable = () => {
  const employees = useSelector(state => state.employees);
  const dispatch = useDispatch();
  let editable = [];
  if (employees.length) editable = employees.map(o => ({ ...o }));
  const [columns] = useState([
    { title: "Name", field: "name" },
    { title: "Email", field: "email", render: rowData => rowData.email ?? "-" },
    {
      title: "Phone",
      field: "phone",
      render: rowData => (rowData.phone ? parseNumber(rowData.phone) : "-")
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
            db.collection("employee")
              .doc(oldData.id)
              .delete()
              .then(() => {
                resolve();
                dispatch(deleteEmployee(oldData));
              });
          })
      }}
    />
  );
};

export default EmployeeTable;
