import React from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

const ListEmployee = ({ employees }) => {
  return (
    <Container>
      <Typography
        variant="h4"
        component="h1"
        align="center"
        style={{ margin: "20px auto" }}
      >
        List of Employees
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Email address</TableCell>
              <TableCell align="center">Phone</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map(employee => (
              <TableRow key={employee._id}>
                <TableCell component="th" scope="row">
                  {employee.name}
                </TableCell>
                <TableCell align="center">{employee.email ?? "-"}</TableCell>
                <TableCell align="center">
                  {employee.phoneNumber ?? "-"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ListEmployee;
